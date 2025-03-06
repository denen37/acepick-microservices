import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert('education', [
            {
                school: 'Harvard University', degreeType: 'BSc', course: 'Computer Science', gradDate: '2020-06-15', userId: '0a1a5aad-6cfc-4cc7-b7c7-2ef40c314e2c', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'Stanford University', degreeType: 'MSc', course: 'Software Engineering', gradDate: '2022-05-20', userId: '2c785cab-e960-486f-b684-6cfc5e777fc2', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'MIT', degreeType: 'PhD', course: 'Artificial Intelligence', gradDate: '2023-08-30', userId: '33bb5c54-fd64-4cfa-b90b-b0951d3f0564', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'Oxford University', degreeType: 'BEng', course: 'Mechanical Engineering', gradDate: '2019-07-10', userId: '5b509520-9507-466c-b085-b6eac6c98a9f', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'Cambridge University', degreeType: 'MSc', course: 'Data Science', gradDate: '2021-09-25', userId: '5e0cd8e5-1342-4577-82b4-935ffc18af8c', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'Yale University', degreeType: 'BSc', course: 'Cybersecurity', gradDate: '2018-12-12', userId: '79b426ad-8846-4f4b-b3f7-679c44f82950', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'Princeton University', degreeType: 'BSc', course: 'Physics', gradDate: '2020-03-05', userId: '7d214fc6-6369-43af-be0b-aa1a0f5ee967', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'Columbia University', degreeType: 'MSc', course: 'Finance', gradDate: '2022-11-30', userId: 'a0a13da5-ee75-4954-a13e-32dbc7167dd3', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'University of Chicago', degreeType: 'BBA', course: 'Business Administration', gradDate: '2017-06-20', userId: 'e69bb0bb-0bfd-417c-a64a-d501ce59c618', createdAt: new Date(), updatedAt: new Date()
            },
            {
                school: 'University of California, Berkeley', degreeType: 'BSc', course: 'Biotechnology', gradDate: '2016-05-18', userId: 'f42f3fb5-646c-4743-afbd-de92e97ecf98', createdAt: new Date(), updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete('education', {}, {});
    },
};