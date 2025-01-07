import { Card, Col, Row, Spin, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from '../../apis/userApi';
import categoriesApiService from '../../services/categoriesApiService';
import newsApiService from '../../services/newsApiService';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({
        categories: 0,
        news: 0,
        users: 0,
    });
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [categories, news, users] = await Promise.all([
                    categoriesApiService.getAllCategories(),
                    newsApiService.getAllNews(),
                    userApi.listUserByAdmin({ page: 1, limit: 1000 }),
                ]);

                setCounts({
                    categories: categories.length,
                    news: news.length,
                    users: users.data.length,
                });
                setLoading(false)
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <Spin spinning={loading}>
            <div className="dashboard-container" style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Statistic title="Danh mục" value={counts.categories} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Statistic title="Tin tức" value={counts.news} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Statistic title="Người dùng" value={counts.users} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </Spin>
    );
};

export default Dashboard;