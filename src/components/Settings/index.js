import React,{useEffect} from 'react'
import SideBar from '../SideBar'
import { Link } from "react-router-dom"; // Use React Router's Link component
import 'bootstrap/dist/css/bootstrap.min.css';
import  "./index.css"
import { Tabs } from 'antd';
import ProfileSetting from '../Profile';
import PaymentSetting from '../PaymentSetting';

const Settings = () => {
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Profile',
    children: <ProfileSetting/>,
  },
  {
    key: '2',
    label: 'Payment Method',
    children:<PaymentSetting/>
  },

];

  return (
<div className='mian-nda'>
      <SideBar />
      <div className='dashboard-body'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

   
      </div>
    </div>
  )
}

export default Settings

