// src/pages/BoardsPage/BoardsPage.tsx
import { Alert, Button, Card, List, Spin, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBoards } from '../../../features/boards/boardsSlice';
import type { Board } from '../../../features/boards/types/Board';
import type { AppDispatch, RootState } from '../../../store/store';

const { Title } = Typography;

const BoardsPage: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { boards, loading, error } = useSelector(
		(state: RootState) => state.boards
	);

	useEffect(() => {
		// TODO: Добавить условие, чтобы не загружать каждый раз, если они уже есть и не устарели
		dispatch(fetchBoards());
	}, [dispatch]);

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<Alert
				message="Ошибка загрузки досок"
				description={error}
				type="error"
				showIcon
			/>
		);
	}

	return (
		<div>
			<Title level={2} style={{ marginBottom: '24px' }}>
				Проекты
			</Title>
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 1,
					md: 2,
					lg: 3,
					xl: 3,
					xxl: 4,
				}}
				dataSource={boards as Board[]}
				renderItem={(board: Board) => (
					<List.Item>
						<Card
							title={board.name}
							actions={[
								<Link to={`/board/${board.id}`} key="goto">
									<Button type="primary">
										Перейти к доске
									</Button>
								</Link>,
							]}
						>
							<Card.Meta
								description={
									board.description || 'Нет описания'
								}
							/>
							<p style={{ marginTop: '10px' }}>
								Задач: {board.taskCount}
							</p>
						</Card>
					</List.Item>
				)}
			/>
			{boards.length === 0 && !loading && (
				<Alert message="Доски не найдены" type="info" />
			)}
		</div>
	);
};

export default BoardsPage;
