import {
    BarsOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop,
    Breadcrumb,
    Col,
    Image,
    Input,
    Row,
    Spin,
    Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import imagesApiService from "../../services/imageApiService";
import "./imageManagement.css";

const ImageManagement = () => {

    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleFilter = async (name) => {
        try {
            const res = await imagesApiService.searchImages(name.target.value);
            setNewsList(res);
        } catch (error) {
            console.log('search to fetch news list:' + error);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Ảnh',
            dataIndex: 'path',
            key: 'path',
            width: '20%',
            render: (path) => <Image src={path} style={{ objectFit: 'cover', height: 80, width: 80 }} alt="Image" />
        },
        {
            title: 'Ngày chụp',
            dataIndex: 'date_taken',
            key: 'date_taken',
            render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
        },
    ];

    useEffect(() => {
        (async () => {
            try {
                await imagesApiService.getAllImages().then((res) => {
                    console.log(res);
                    setNewsList(res);
                    setLoading(false);
                });
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])

    return (
        <div>
            <Spin spinning={loading}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <BarsOutlined />
                                <span>Quản lý hình ảnh</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div id="my__event_container__list">
                            <PageHeader
                                subTitle=""
                                style={{ fontSize: 14 }}
                            >
                                <Row>
                                    <Col span="18">
                                        {/* <Input
                                            placeholder="Tìm kiếm"
                                            allowClear
                                            onChange={handleFilter}
                                            style={{ width: 300 }}
                                        /> */}
                                    </Col>
                                </Row>
                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table scroll={{ x: true }}
                            columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={newsList} />
                    </div>
                </div>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div>
    )
}

export default ImageManagement;