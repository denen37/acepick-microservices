import { QueryInterface } from 'sequelize';

import { WorkType } from '../models/Professional';
import { v4 as uuidv4 } from 'uuid';

const userIds = [
    '0a1a5aad-6cfc-4cc7-b7c7-2ef40c314e2c',
    '2c785cab-e960-486f-b684-6cfc5e777fc2',
    '33bb5c54-fd64-4cfa-b90b-b0951d3f0564',
    '5b509520-9507-466c-b085-b6eac6c98a9f',
    '5e0cd8e5-1342-4577-82b4-935ffc18af8c',
    '79b426ad-8846-4f4b-b3f7-679c44f82950',
    '7d214fc6-6369-43af-be0b-aa1a0f5ee967',
    'a0a13da5-ee75-4954-a13e-32dbc7167dd3',
    'e69bb0bb-0bfd-417c-a64a-d501ce59c618',
    'f42f3fb5-646c-4743-afbd-de92e97ecf98',
];

const generateRandomNumber = () => Math.floor(Math.random() * 10) + 1;

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert('professional', userIds.map((userId, index) => ({
            file: null,
            intro: 'Experienced professional in various domains.',
            chargeFrom: (Math.random() * 100).toFixed(2),
            language: ['English', 'French', 'Spanish', 'German', 'Yoruba', 'Igbo', 'Hausa', 'Tiv'][Math.floor(Math.random() * 7)],
            avaialable: true,
            workType: WorkType.IDLE,
            totalJobCompleted: 0,
            totalJobCanceled: 0,
            totalReview: 0,
            totalJobPending: 0,
            totalJobOngoing: 0,
            totalJobRejected: 0,
            totalEarning: 0,
            totalDispute: 0,
            completedAmount: 0.0,
            pendingAmount: 0.0,
            rejectedAmount: 0.0,
            availableWithdrawalAmount: 0.0,
            regNum: uuidv4(),
            yearsOfExp: Math.floor(Math.random() * 20) + 1, // 1 to 20 years
            online: false,
            userId,
            professionId: generateRandomNumber(),
            sectorId: generateRandomNumber(),
            corperateId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        })));
    },

    down: async (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete('professional', {}, {});
    },
};
