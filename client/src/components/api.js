import axios from 'axios';

const API_URL = 'http://localhost:5000/api/staff';

export const getStaff = () => axios.get(API_URL);
export const createStaff = (newStaff) => axios.post(API_URL, newStaff);
export const updateStaff = (id, updatedStaff) => axios.put(`${API_URL}/${id}`, updatedStaff);
export const deleteStaff = (id) => axios.delete(`${API_URL}/${id}`);
