import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />首页</Link>
      </Menu.Item>
      <Menu.Item key="/addResumer">
        <Link to="/addResumer"><Icon type="user" />添加简历</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
