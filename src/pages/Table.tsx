import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { Table as AntTable, Card, Typography, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { fetchDeploymentInfo } from "../api/lib/deploymentInfo";

const { Title } = Typography;

interface DeploymentInfoType {
  id: string;
  buildId: string;
  requestOwner: string;
  status: string;
}

const columns: ColumnsType<DeploymentInfoType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Build ID",
    dataIndex: "buildId",
    key: "buildId",
  },
  {
    title: "Request Owner",
    dataIndex: "requestOwner",
    key: "requestOwner",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    defaultSortOrder: "ascend",
  },
];

const Table = () => {
  const [tableData, setTableData] = useState<DeploymentInfoType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await fetchDeploymentInfo();
      const data = response.data;

      const processedData: DeploymentInfoType[] = [];

      data.forEach((_: never, index: number) => {
        if (index % 2 === 0 && index + 1 < data.length) {
          const deploymentInfo = data[index];
          const configInfo = data[index + 1];

          const item: DeploymentInfoType = {
            id: deploymentInfo.id || "N/A",
            buildId: deploymentInfo.build_id || "N/A",
            requestOwner: configInfo.githubRepoOwner || "N/A",
            status: deploymentInfo.status || "N/A",
          };

          processedData.push(item);
        }
      });

      setTableData(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title level={3}>Deployments</Title>
          <Button type="primary" onClick={() => navigate("/")}>
            Create New Deployment
          </Button>
        </div>
        <AntTable
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default Table;
