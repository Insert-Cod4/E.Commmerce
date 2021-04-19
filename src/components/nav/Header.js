import React, { useState } from 'react';
import { Menu, Badge } from 'antd';

import {
  GlobalOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from "firebase";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';

const { SubMenu, Item } = Menu; //Menu.SubMenu

const Header = () => {

  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let history = useHistory()
  let { user, cart } = useSelector((state) => ({ ...state }))

  const handleClick = (e) => {
    //console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut()
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  }

  return (

    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">

      <Item key="home" icon={<GlobalOutlined />}>
        <Link to="/" key="1">
          Home
          </Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart" key="2">
          <Badge count={cart.length} offset={[9, 0]}>Cart</Badge>
        </Link>
      </Item>


      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register" key="3">Register
            </Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login" key="4">Login
              </Link>
        </Item>
      )}

      {
        user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split('@')[0]} // name@gmail.com [0]
            className="float-right"
          >

            {user && user.role === 'subscriber' && (
              <Item>
                <Link to="/user/history" key="5">Dashboard</Link>
              </Item>
            )}

            {user && user.role === 'admin' && (
              <Item>
                <Link to="/admin/dashboard" key="6">Dashboard</Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}

      <span className="float-right p-1">
        <Search />
      </span>

    </Menu>

  );

};

export default Header