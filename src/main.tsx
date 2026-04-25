import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme, Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import App from './App';
import './index.css';

function Root() {
  const [dark, setDark] = useState(true);

  return (
    <ConfigProvider
      theme={{
        algorithm: dark
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          background: dark ? '#141414' : '#f5f5f5',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            padding: 16,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Switch
            checked={dark}
            onChange={setDark}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>

        <App />
      </div>
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);