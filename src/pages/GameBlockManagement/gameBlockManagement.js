import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Modal, Form, Input, Space, Spin, Breadcrumb, Select, Popconfirm, Row, Col } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import gameBlockApiService from '../../services/gameBlockApiService';
import uploadFileApi from '../../apis/uploadFileApi';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '@ant-design/pro-layout';
import './gameBlockManagement.css';

const { Option } = Select;

const GameBlockManagement = () => {
    const [gameBlocks, setGameBlocks] = useState([]);
    const [allGameBlocks, setAllGameBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const history = useHistory();
    const [imagePath, setImagePath] = useState('');

    const fetchGameBlocks = async () => {
        setLoading(true);
        try {
            const data = await gameBlockApiService.getAllGameBlocks();
            setAllGameBlocks(data);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                const filteredData = data.filter(block => block.user_id === user.id);
                setGameBlocks(filteredData);
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch game blocks:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameBlocks();
    }, []);

    const handleCreateOrUpdate = async (values) => {
        setLoading(true);
        try {
            const payload = {
                game_name: values.game_name,
                image_path: imagePath,
                status: values.status,
            };

            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                payload.user_id = user.id;
            }

            if (currentId) {
                await gameBlockApiService.updateGameBlock(currentId, payload);
                notification.success({ message: 'Cập nhật chặn game thành công' });
            } else {
                await gameBlockApiService.createGameBlock(payload);
                notification.success({ message: 'Tạo chặn game thành công' });
            }
            setOpenModal(false);
            fetchGameBlocks();
        } catch (error) {
            notification.error({ message: 'Có lỗi xảy ra' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        const gameBlock = gameBlocks.find(block => block.id === id);
        form.setFieldsValue(gameBlock);
        setCurrentId(id);
        setOpenModal(true);
    };

    const handleChangeImage = async (e) => {
        setLoading(true);
        const response = await uploadFileApi.uploadFile(e);
        if (response) {
            setImagePath(response);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await gameBlockApiService.deleteGameBlock(id);
            notification.success({ message: 'Xóa chặn game thành công' });
            fetchGameBlocks();
        } catch (error) {
            notification.error({ message: 'Có lỗi xảy ra khi xóa' });
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên Game',
            dataIndex: 'game_name',
            key: 'game_name',
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'image_path',
            key: 'image_path',
            render: (text) => <img src={text} alt="Game" style={{ height: 80 }} />,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa chặn game này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="danger">Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="game-block-management">
            <Spin spinning={loading}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item href="">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Chặn Game</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ marginTop: 20 }}>
                    <div id="my__event_container__list">
                        <PageHeader
                            subTitle=""
                            style={{ fontSize: 14 }}
                        >
                            <Row>
                                <Col span={18}>
                                    {/* Có thể thêm nội dung khác ở đây nếu cần */}
                                </Col>
                                <Col span={6}>
                                    <Row justify="end">
                                        <Space>
                                            <Button onClick={() => setOpenModal(true)} icon={<PlusOutlined />} style={{ marginLeft: 10 }}>
                                                Tạo Chặn Game
                                            </Button>
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        </PageHeader>
                    </div>
                </div>
                <div style={{ marginTop: 30 }}>
                    <Table columns={columns} dataSource={gameBlocks} loading={loading} rowKey="id" />

                </div>
                <Modal
                    title={currentId ? "Chỉnh sửa Chặn Game" : "Tạo Chặn Game"}
                    visible={openModal}
                    onCancel={() => setOpenModal(false)}
                    onOk={() => {
                        form.validateFields().then(values => {
                            handleCreateOrUpdate(values);
                        });
                    }}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="game_name" label="Tên Game" rules={[{ required: true, message: 'Vui lòng nhập tên game!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Hình Ảnh">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                        </Form.Item>
                        <Form.Item name="status" label="Trạng Thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                            <Select placeholder="Chọn trạng thái">
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    );
};

export default GameBlockManagement; 