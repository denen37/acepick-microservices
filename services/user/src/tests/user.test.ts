// import request from "supertest";
// import app from "../app"; // Adjust the path to your Express app

// describe("User API Tests", () => {
//     it("should return a 200 status for GET /", async () => {
//         const res = await request(app).get("/");
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty("message");
//     });

//     it("should create a new user", async () => {
//         const res = await request(app)
//             .post("/users")
//             .send({ name: "John Doe", email: "johndoe@example.com" });

//         expect(res.statusCode).toBe(201);
//         expect(res.body).toHaveProperty("id");
//         expect(res.body.name).toBe("John Doe");
//     });

//     it("should return a user by ID", async () => {
//         const userId = 1;
//         const res = await request(app).get(`/users/${userId}`);
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty("id", userId);
//     });

//     it("should update a user", async () => {
//         const userId = 1;
//         const res = await request(app)
//             .put(`/users/${userId}`)
//             .send({ name: "Jane Doe" });

//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty("name", "Jane Doe");
//     });

//     it("should delete a user", async () => {
//         const userId = 1;
//         const res = await request(app).delete(`/users/${userId}`);
//         expect(res.statusCode).toBe(204);
//     });
// });
