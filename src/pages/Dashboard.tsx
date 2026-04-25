import { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Input,
  Button,
  message,
  Space,
  Tag,
  Divider,
  Typography,
  Skeleton,
} from 'antd';
import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import api from '../api/client';
import type {
  Balance,
  RequestPayload,
  RequestResponse,
  SyncResponse,
} from '../types';

const { Title, Text } = Typography;

export default function Dashboard() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [status, setStatus] = useState<string | null>(null);

  const [form, setForm] = useState<RequestPayload>({
    employeeId: 'emp1',
    locationId: 'loc1',
    daysRequested: 1,
  });

  // 🔄 Fetch Balance
  const fetchBalance = async () => {
    try {
      const res = await api.get<Balance>(
        `/balances?employeeId=${form.employeeId}&locationId=${form.locationId}`,
      );
      setBalance(res.data);
    } catch {
      message.error('Failed to fetch balance');
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();

    const interval = setInterval(fetchBalance, 5000);
    return () => clearInterval(interval);
  }, [form.employeeId, form.locationId]);

  // 📝 Submit Request
  const submitRequest = async () => {
    setLoading(true);
    try {
      const res = await api.post<RequestResponse>('/requests', form);
      setStatus(res.data.status);
      message.success(`Request ${res.data.status}`);
      fetchBalance();
    } catch (err: any) {
      setStatus('REJECTED');
      message.error(err.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Sync
  const handleSync = async () => {
    setLoading(true);
    try {
      const res = await api.post<SyncResponse>('/sync/batch');
      message.success(`Synced ${res.data.count} records`);
      fetchBalance();
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Sync failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Proper Status Renderer
  const renderStatus = () => {
    // initial loading
    if (initialLoading) {
      return <Skeleton.Button active size="small" />;
    }

    // no request yet
    if (!status) {
      return <Text type="secondary">No requests yet</Text>;
    }

    // approved
    if (status === 'APPROVED') {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Approved
        </Tag>
      );
    }

    // rejected
    if (status === 'REJECTED') {
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Rejected
        </Tag>
      );
    }

    // pending
    return (
      <Tag icon={<ClockCircleOutlined />} color="warning">
        Pending
      </Tag>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={1}>Time-Off Dashboard</Title>
  
      <Row gutter={24}>
        
        {/* LEFT SIDE (DATA) */}
        <Col xs={24} md={12}>
      {/* ROW 1 */}
<Row gutter={16}>
  
  {/* Balance */}
  <Col xs={24} md={12}>
    <Card>
      {initialLoading ? (
        <Skeleton active />
      ) : (
        <>
          <Statistic
            title="Current Balance"
            value={balance?.balance ?? 0}
            suffix="days"
          />
          <Text type="secondary">
            Last synced:{' '}
            {balance?.lastSyncedAt
              ? new Date(balance.lastSyncedAt).toLocaleTimeString()
              : '—'}
          </Text>
        </>
      )}
    </Card>
  </Col>

  {/* Status */}
  <Col xs={24} md={12}>
    <Card>
      <Statistic title="Last Request Status" value=" " />
      <div style={{ marginTop: 0 }}>{renderStatus()}</div>
    </Card>
  </Col>

</Row>

{/* ROW 2 */}
<Row gutter={16} style={{ marginTop: 16 }}>
  
  {/* Sync */}
  <Col span={24}>
    <Card title="Sync with HCM">
      <Button
        type="primary"
        icon={<SyncOutlined />}
        block
        onClick={handleSync}
        loading={loading}
      >
        Sync Now
      </Button>
    </Card>
  </Col>

</Row>
        </Col>
  
        {/* RIGHT SIDE (FORM) */}
        <Col xs={24} md={12}>
  <Card title="Request Time Off">
    <Row gutter={[16, 16]}>
      
      {/* Employee ID */}
      <Col xs={24} md={12}>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>
            Employee ID
          </label>
          <Input
            placeholder="Enter employee ID"
            value={form.employeeId}
            onChange={(e) =>
              setForm({ ...form, employeeId: e.target.value })
            }
          />
        </div>
      </Col>

      {/* Location ID */}
      <Col xs={24} md={12}>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>
            Location ID
          </label>
          <Input
            placeholder="Enter location ID"
            value={form.locationId}
            onChange={(e) =>
              setForm({ ...form, locationId: e.target.value })
            }
          />
        </div>
      </Col>

      {/* Days Requested */}
      <Col xs={24}>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>
            Days Requested
          </label>
          <Input
            type="number"
            min={1}
            placeholder="Enter number of days"
            value={form.daysRequested}
            onChange={(e) =>
              setForm({
                ...form,
                daysRequested: Number(e.target.value),
              })
            }
          />
        </div>
      </Col>

      {/* Submit */}
      <Col xs={24}>
        <Button
          type="primary"
          size="large"
          icon={<CheckCircleOutlined />}
          onClick={submitRequest}
          loading={loading}
          block
        >
          Submit Request
        </Button>
      </Col>

    </Row>
  </Card>
</Col>
      </Row>
    </div>
  );
}