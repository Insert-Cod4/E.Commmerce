import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct, updateProduct } from "../../functions/product";
import { getCategories, getCategorySubs } from "../../functions/category";
import FileUpload from "../../components/forms/FileUpload"
import { LoadingOutlined } from '@ant-design/icons'
import ProductUpdateForm from "../../components/forms/ProductUpdateForm"

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: "",

}



const ProductUpdate = ({ match, history }) => {
    //state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false)
    // redux 
    const { user } = useSelector((state) => ({
        ...state
    }))

    const { slug } = match.params;

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then((p) => {
                // 1 laod single product
                setValues({ ...values, ...p.data })
                // 2 load single product category subs
                getCategorySubs(p.data.category._id)
                    .then((res) => {
                        setSubOptions(res.data); // on first load , show 
                    });
                // 3 prepare array of sub ids to show as default sub values in antd select
                let arr = []
                p.data.subs.map((s) => {
                    arr.push(s._id);
                });
                console.log("arr", arr)
                setArrayOfSubIds((prev) => arr); // required for ant design
            });
    };

    const handleCatagoryChange = (e) => {
        //
        e.preventDefault();
        console.log('CLINKED CATEGORY', e.target.value)
        setValues({ ...values, subs: [] });

        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value)
            .then((res) => {
                console.log('Sub Option On Category Click', res)
                setSubOptions(res.data);
            });


        // if user clicks back to the original category
        // show its sub categoreis in default
        if (values.category._id === e.target.value) {
            loadProduct();
        }

        setArrayOfSubIds([]);
    };


    const loadCategories = () => {
        getCategories()
            .then(c => {
                console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data)
                setCategories(c.data);
            })
    }

    console.log("EXISTING CATEGORY VALUE.C", values.category)


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        values.subs = arrayOfSubs
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false)
                toast.success(`${res.data.title} is Updated`);
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            })

    };


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }






    return (

        <div className="container-fluid">
            <div className="row">

                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Product Update</h4>}

                    {/*JSON.stringify(values)*/}


                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    <br />


                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCatagoryChange={handleCatagoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubIds={setArrayOfSubIds}
                        selectedCategory={selectedCategory}
                    />
                    <hr />
                </div>
            </div>
        </div>
    );

};

export default ProductUpdate;