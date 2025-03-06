import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ProfileType } from '../models/Profile';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert('profile', [
            {
                fullName: 'John Doe', fcmToken: null, avatar: 'avatar1.png', verified: true, notified: false,
                lga: 'LGA1', state: 'State1', address: '123 Street, City', totalHire: 5, totalExpense: 1000,
                rate: 4.5, totalPendingHire: 2, count: 10, totalOngoingHire: 3, totalCompletedHire: 7,
                totalReview: 5, totalJobRejected: 1, totalJobCanceled: 1, totalDisputes: 0,
                bvn: '12345678901', type: ProfileType.CLIENT, corperate: false, switch: false, store: false,
                userId: '0a1a5aad-6cfc-4cc7-b7c7-2ef40c314e2c', createdAt: new Date(), updatedAt: new Date()
            },
            {
                fullName: 'Jane Smith', fcmToken: null, avatar: 'avatar2.png', verified: true, notified: true,
                lga: 'LGA2', state: 'State2', address: '456 Avenue, City', totalHire: 8, totalExpense: 2500,
                rate: 4.7, totalPendingHire: 1, count: 12, totalOngoingHire: 4, totalCompletedHire: 9,
                totalReview: 6, totalJobRejected: 0, totalJobCanceled: 2, totalDisputes: 1,
                bvn: '23456789012', type: ProfileType.PROFESSIONAL, corperate: false, switch: true, store: true,
                userId: '2c785cab-e960-486f-b684-6cfc5e777fc2', createdAt: new Date(), updatedAt: new Date()
            },
            {
                fullName: 'Michael Brown', fcmToken: null, avatar: 'avatar3.png', verified: false, notified: false,
                lga: 'LGA3', state: 'State3', address: '789 Boulevard, City', totalHire: 2, totalExpense: 500,
                rate: 3.8, totalPendingHire: 3, count: 5, totalOngoingHire: 1, totalCompletedHire: 2,
                totalReview: 2, totalJobRejected: 2, totalJobCanceled: 0, totalDisputes: 1,
                bvn: '34567890123', type: ProfileType.CORPERATE, corperate: true, switch: false, store: false,
                userId: '33bb5c54-fd64-4cfa-b90b-b0951d3f0564', createdAt: new Date(), updatedAt: new Date()
            },
            {
                fullName: 'Emily White', fcmToken: null, avatar: 'avatar4.png', verified: true, notified: true,
                lga: 'LGA4', state: 'State4', address: '1011 Drive, City', totalHire: 6, totalExpense: 1200,
                rate: 4.2, totalPendingHire: 1, count: 8, totalOngoingHire: 2, totalCompletedHire: 6,
                totalReview: 4, totalJobRejected: 1, totalJobCanceled: 1, totalDisputes: 0,
                bvn: '45678901234', type: ProfileType.CLIENT, corperate: false, switch: false, store: true,
                userId: '5b509520-9507-466c-b085-b6eac6c98a9f', createdAt: new Date(), updatedAt: new Date()
            },
            {
                fullName: 'Daniel Green', fcmToken: null, avatar: 'avatar5.png', verified: false, notified: false,
                lga: 'LGA5', state: 'State5', address: '1213 Lane, City', totalHire: 3, totalExpense: 700,
                rate: 3.9, totalPendingHire: 2, count: 6, totalOngoingHire: 1, totalCompletedHire: 3,
                totalReview: 3, totalJobRejected: 2, totalJobCanceled: 0, totalDisputes: 1,
                bvn: '56789012345', type: ProfileType.PROFESSIONAL, corperate: false, switch: true, store: false,
                userId: '5e0cd8e5-1342-4577-82b4-935ffc18af8c', createdAt: new Date(), updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete('profile', {}, {});
    },
};
