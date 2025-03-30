import { useState, useEffect } from "react";
import { Table as AntTable, Card, Typography, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface DataType {
  id: string;
  buildId: string;
  requestOwner: string;
  status: string;
}

const Table = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://hr4hdlc2o0.execute-api.us-east-1.amazonaws.com/deployments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      const processedData: DataType[] = [];

      for (let i = 0; i < data.length; i += 2) {
        if (i + 1 < data.length) {
          const deploymentInfo = data[i];
          const configInfo = data[i + 1];

          const item: DataType = {
            id: deploymentInfo.id || "N/A",
            buildId: deploymentInfo.build_id || "N/A",
            requestOwner: configInfo.githubRepoOwner || "N/A",
            status: deploymentInfo.status || "N/A",
          };

          processedData.push(item);
        }
      }
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

  const columns: ColumnsType<DataType> = [
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
