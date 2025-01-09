import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Modal, Form, Input, Space, Spin, Breadcrumb, Select, Popconfirm, Row, Col } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import accessApiService from '../../services/accessApiService';
import categoriesApiService from '../../services/categoriesApiService'; // Import categoriesApiService
import { useHistory } from 'react-router-dom';
import { PageHeader } from '@ant-design/pro-layout';
import './AdManagement.css';

const { Option } = Select;

const AdManagement = () => {
    const [accessRecords, setAccessRecords] = useState([]);
    const [allAccessRecords, setAllAccessRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const history = useHistory();
    const [categories, setCategories] = useState([]); // State for categories

    const fetchAccessRecords = async () => {
        setLoading(true);
        try {
            const data = await accessApiService.getAllAccess();
            setAllAccessRecords(data);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                const filteredData = data.filter(record => record.user_id === user.id);
                setAccessRecords(filteredData);
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch access records:', error);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await categoriesApiService.getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    useEffect(() => {
        fetchAccessRecords();
        fetchCategories(); // Fetch categories on component mount
    }, []);

    const handleCreateOrUpdate = async (values) => {
        setLoading(true);
        try {
            const payload = {
                address: values.address,
                user_id: JSON.parse(localStorage.getItem('user')).id, 
                status: values.status,
                category_id: values.category_id, 
            };

            if (currentId) {
                await accessApiService.updateAccess(currentId, payload);
                notification.success({ message: 'Cập nhật quyền truy cập thành công' });
            } else {
                await accessApiService.createAccess(payload);
                notification.success({ message: 'Tạo quyền truy cập thành công' });
            }
            setOpenModal(false);
            fetchAccessRecords();
        } catch (error) {
            notification.error({ message: 'Có lỗi xảy ra' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        const accessRecord = accessRecords.find(record => record.id === id);
        form.setFieldsValue(accessRecord);
        setCurrentId(id);
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await accessApiService.deleteAccess(id);
            notification.success({ message: 'Xóa quyền truy cập thành công' });
            fetchAccessRecords();
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
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
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
                        title="Bạn có chắc chắn muốn xóa quyền truy cập này?"
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
        <div className="access-management">
            <Spin spinning={loading}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item href="">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Quản lý quyền truy cập</Breadcrumb.Item>
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
                                                Tạo Quyền Truy Cập
                                            </Button>
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        </PageHeader>
                    </div>
                </div>
                <div style={{ marginTop: 30 }}>
                    <Table columns={columns} dataSource={accessRecords} loading={loading} rowKey="id" />
                </div>
                <Modal
                    title={currentId ? "Chỉnh sửa Quyền Truy Cập" : "Tạo Quyền Truy Cập"}
                    visible={openModal}
                    onCancel={() => setOpenModal(false)}
                    onOk={() => {
                        form.validateFields().then(values => {
                            handleCreateOrUpdate(values);
                        });
                    }}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="status" label="Trạng Thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                            <Select placeholder="Chọn trạng thái">
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="category_id" label="Danh mục" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
                            <Select placeholder="Chọn danh mục">
                                {categories.map(category => (
                                    <Option key={category.id} value={category.id}>{category.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    );
};

export default AdManagement; 