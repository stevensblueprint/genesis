import { Card, Form, Input, Button, Divider, Typography, Collapse, Switch, Space, Alert } from "antd";
import { GithubOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title } = Typography;
const { Panel } = Collapse;

interface Environment {
  deploy: boolean;
  environmentType: string;
  branchName: string;
  pipelineConfig: {
    name: string;
  };
  s3Config: {
    bucketName: string;
    artifactsBucket: string;
    publicAccess: boolean;
    indexFile: string;
    errorFile: string;
  };
}

interface ConfigType {
  name: string;
  githubRepoOwner: string;
  githubRepoName: string;
  githubAccessTokenName: string;
  dev: Environment;
  prod: Environment;
}

interface FormValues {
  config: ConfigType;
  env: {
    variables: Array<{ key: string; value: string }>;
  };
}

const ViteForm = () => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    
    try {
      const envVars: Record<string, string> = {};

      if (values.env?.variables) {
        values.env.variables.forEach(({ key, value }) => {
          if (key && value) {
            envVars[key] = value;
          }
        });
      }

      const formattedValues = {
        config_type: "vite",
        config: values.config,
        env: envVars
      };
      
      const json = JSON.stringify(formattedValues, null, 2);
      // console.log(json);
      
      const response = await fetch('https://a1gwnyrho3.execute-api.us-east-1.amazonaws.com/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      // console.log('Success:', data);
      setSuccessMessage(`Project deployment ID ${data.deployment_id} initiated successfully! You'll receive an e-mail when the deployment is complete.`);
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to deploy project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const EnvironmentPanel = ({ environment }: { environment: "dev" | "prod" }) => (
    <>
      <Form.Item
        name={["config", environment, "deploy"]}
        label="Deploy Environment"
        valuePropName="checked"
        initialValue={environment === "prod"}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name={["config", environment, "environmentType"]}
        label="Environment Type"
        initialValue={environment}
      >
        <Input placeholder="environment-type" />
      </Form.Item>

      <Form.Item
        name={["config", environment, "branchName"]}
        label="Branch Name"
        initialValue={environment === "prod" ? "main" : "dev"}
        rules={[{ message: 'Please input the branch name' }]}
      >
        <Input placeholder="branch-name" />
      </Form.Item>

      <Divider orientation="left">Pipeline Configuration</Divider>
      <Form.Item
        name={["config", environment, "pipelineConfig", "name"]}
        label="Pipeline Name"
        rules={[{ message: 'Please input the pipeline name' }]}
      >
        <Input placeholder={`${environment}-pipeline`} />
      </Form.Item>

      <Divider orientation="left">S3 Configuration</Divider>
      <Form.Item
        name={["config", environment, "s3Config", "bucketName"]}
        label="Bucket Name"
        rules={[{ message: 'Please input the bucket name' }]}
      >
        <Input placeholder={`${environment}-bucket-name`} />
      </Form.Item>

      <Form.Item
        name={["config", environment, "s3Config", "artifactsBucket"]}
        label="Artifacts Bucket"
        rules={[{ message: 'Please input the artifacts bucket name' }]}
      >
        <Input placeholder={`${environment}-artifacts-bucket`} />
      </Form.Item>

      <Form.Item
        name={["config", environment, "s3Config", "publicAccess"]}
        label="Public Access"
        valuePropName="checked"
        initialValue={environment === "prod"}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name={["config", environment, "s3Config", "indexFile"]}
        label="Index File"
        initialValue="index.html"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["config", environment, "s3Config", "errorFile"]}
        label="Error File"
        initialValue="index.html"
      >
        <Input />
      </Form.Item>
    </>
  );

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <Title level={2} className="text-center mb-6">Vite Project Configuration</Title>
        
        {successMessage && (
          <Alert
            message="Success"
            description={successMessage}
            type="success"
            showIcon
            closable
            className="mb-4"
          />
        )}
        
        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            closable
            className="mb-4"
          />
        )}
        
        <Form 
          form={form}
          layout="vertical" 
          onFinish={onFinish}
        >
          <Divider orientation="left">Stack Information</Divider>
          <Form.Item 
            name={["config", "name"]} 
            label="Name of Stack"
            rules={[{ message: 'Please input the stack name' }]}
            tooltip="A unique name for your project stack"
          >
            <Input placeholder="my-vite-app" />
          </Form.Item>

          <Divider orientation="left">GitHub Configuration</Divider>
          <div className="space-y-4">
            <Form.Item
              name={["config", "githubRepoOwner"]}
              label="GitHub Repository Owner"
              rules={[{ message: 'Please input the GitHub repository owner' }]}
              tooltip="The GitHub username or organization that owns the repository"
            >
              <Input 
                prefix={<GithubOutlined className="text-gray-400" />}
                placeholder="username or organization"
              />
            </Form.Item>

            <Form.Item
              name={["config", "githubRepoName"]}
              label="GitHub Repository Name"
              rules={[{ message: 'Please input the GitHub repository name' }]}
              tooltip="The name of the GitHub repository"
            >
              <Input 
                prefix={<GithubOutlined className="text-gray-400" />}
                placeholder="your-vite-repo"
              />
            </Form.Item>

            <Form.Item
              name={["config", "githubAccessTokenName"]}
              label="GitHub Access Token Name"
              rules={[{ message: 'Please input the GitHub access token name' }]}
              tooltip="The name of your GitHub access token for authentication"
            >
              <Input.Password placeholder="GITHUB_TOKEN" />
            </Form.Item>
          </div>

          <Divider orientation="left">Environment Configuration</Divider>
          <Collapse className="mb-8">
            <Panel header="Development Environment" key="dev">
              <EnvironmentPanel environment="dev" />
            </Panel>
            <Panel header="Production Environment" key="prod">
              <EnvironmentPanel environment="prod" />
            </Panel>
          </Collapse>

          <Divider orientation="left">Environment Variables</Divider>
          <Form.List name={["env", "variables"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      rules={[{ message: 'Missing environment variable key' }]}
                    >
                      <Input placeholder="VARIABLE_NAME" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      rules={[{ message: 'Missing environment variable value' }]}
                    >
                      <Input placeholder="value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Environment Variable
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item className="mt-8">
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ViteForm;
