import React from 'react';
import { Select } from 'antd'

const { Option } = Select;

const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    values,
    setValues,
    handleCatagoryChange,
    subOptions,
    categories,
    arrayOfSubs,
    setArrayOfSubIds,
    selectedCategory, }) => {
    // Destructure
    const { title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand } = values;


    return (
        <form onSubmit={handleSubmit}>


            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={values.title}
                    onChange={handleChange}>
                </input>
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={values.description}
                    onChange={handleChange}>
                </input>
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="text"
                    name="price"
                    className="form-control"
                    value={values.price}
                    onChange={handleChange}>
                </input>
            </div>

            <div className="form-group">
                <label>Shipping</label>

                <select
                    value={shipping === 'Yes' ? 'Yes' : 'No'}
                    name="shipping"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option >Please Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>

            </div>


            <div className="form-group">
                <label>Quantity</label>

                <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    value={values.quantity}
                    onChange={handleChange}>
                </input>

            </div>


            <div className="form-group">
                <label>Color</label>

                <select
                    value={color}
                    name="color"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option >Please Select</option>
                    {colors.map(c => <option key={c}
                        value={c}>{c}</option>)}
                </select>
            </div>


            <div className="form-group">
                <label>Brand</label>

                <select
                    value={brand}
                    name="brand"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option >Please Select</option>
                    {brands.map(b => <option key={b}
                        value={b}>{b}</option>)}
                </select>

            </div>

            <div className="form-group">
                <label>Category</label>
                <select name="category"
                    className="form-control"
                    onChange={handleCatagoryChange}
                    value={selectedCategory ? selectedCategory : category._id}
                >

                    {categories.length > 0
                        && categories.map((c) =>
                            (<option key={c._id} value={c._id} >{c.name}</option>))}
                </select>
            </div>


            <div>
                <label>Sub Categories</label>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please Select"
                    value={arrayOfSubs}
                    onChange={(value) => setArrayOfSubIds(value)}
                >
                    {subOptions.length && subOptions.map((s) =>
                    (
                        <Option key={s._id} value={s._id}>
                            {s.name}
                        </Option>

                    ))}
                </Select>
            </div>

            <br />
            <button className="btn -btn-outline-info">Save</button>



        </form>

    )


}

export default ProductUpdateForm;