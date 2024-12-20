import React, { useState } from 'react';
import './Forms.css';
import { CiCirclePlus } from "react-icons/ci";
import {toast} from "react-toastify";

const Forms = ({ adduser }) => {
    const [newRow, setNewRow] = useState({
        firstName: '',
        company: { name: '', title: '' },
        address: { country: '' },
    });
    const [errors, setErrors] = useState({}); // Track validation errors

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setNewRow({
                ...newRow,
                [parent]: { ...newRow[parent], [child]: value },
            });
        } else {
            setNewRow({ ...newRow, [name]: value });
        }
    };

    const validateFields = () => {
        const errors = {};
        if (!newRow.firstName.trim()) errors.firstName = 'Name is required.';
        if (!newRow.company.name.trim()) errors.companyName = 'Company Name is required.';
        if (!newRow.company.title.trim()) errors.companyTitle = 'Role is required.';
        if (!newRow.address.country.trim()) errors.country = 'Country is required.';
        return errors;
    };

    const addRow = (e) => {
        e.preventDefault();
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Input field can't be empty.");
            return;
        }

        adduser({
            ...newRow,
            firstName: newRow.firstName.trim(),
            company: {
                name: newRow.company.name.trim(),
                title: newRow.company.title.trim(),
            },
            address: {
                country: newRow.address.country.trim(),
            },
        });


        setNewRow({
            firstName: '',
            company: { name: '', title: '' },
            address: { country: '' },
        });
        setErrors({});
    };

    return (
        <div className="Forms__container">
            <div className="Forms__container-header">
                <form onSubmit={addRow}>
                    <h3>Add New User</h3>
                    <div className="Forms__container-flex">
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={newRow.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                        <div>
                            <label>Company Name:</label>
                            <input
                                type="text"
                                name="company.name"
                                value={newRow.company.name}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.companyName && <span className="error">{errors.companyName}</span>}
                        </div>
                        <div>
                            <label>Role:</label>
                            <input
                                type="text"
                                name="company.title"
                                value={newRow.company.title}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.companyTitle && <span className="error">{errors.companyTitle}</span>}
                        </div>
                        <div>
                            <label>Country:</label>
                            <input
                                type="text"
                                name="address.country"
                                value={newRow.address.country}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.country && <span className="error">{errors.country}</span>}
                        </div>
                        <button type="submit"><CiCirclePlus size={45} color="black" width={35} /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Forms;
