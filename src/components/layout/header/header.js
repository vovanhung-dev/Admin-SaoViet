import { Col, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from "../../../apis/userApi";
import MenuDropdown from "../../DropdownMenu/dropdownMenu";
import "./header.css";

function Topbar() {

  const [visible, setVisible] = useState(false);


  const handleOk = () => {
    setVisible(false);
  }


  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.pingRole();
        console.log(response.role);
      } catch (error) {
        console.log('Failed to fetch event list:' + error);
      }
    })();
  }, [])

  return (
    <div
      className="header"
      style={{ background: "#FFFFF", padding: 0, margin: 0 }}
    >
      <div >
        <Row className="header" style={{ background: "#FFFFFF", top: 0, position: 'fixed', left: 0, display: 'flex', width: '100%', padding: 0, zIndex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Col span={10}>
            <div style={{ position: 'relative', display: 'flex', paddingTop: 3, paddingBottom: 3, alignItems: "center", marginLeft: 8 }}>
              <Row
                justify="center"
              >
                <Col style={{ paddingLeft: 10 }}>
                  <a href="#">
                    <img style={{ height: 60, objectFit: 'contain' }} className="logo" alt="" src="https://i.ibb.co/9bfyd1M/saoviet-logo.png" />
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6} offset={8}>
            <div style={{ display: 'flex', padding: 5, justifyContent: 'center', flexDirection: 'row', float: 'right', alignItems: "center", marginRight: 48 }}>
              <Row>
                <MenuDropdown key="image" />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div >
  );
}

export default Topbar;