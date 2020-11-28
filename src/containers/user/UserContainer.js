import React, {useEffect, useState} from 'react';
import {deleteUser, getEducation, getJobs, getUser} from '../../api/UserService'
import {setListUser} from "../../redux/action/User";
import {connect} from "react-redux";
import UserList from "./UserList";
import {Button, Container, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import UserForm from "./UserForm";
import {setListJob} from "../../redux/action/Job";
import {setListEducation} from "../../redux/action/Education";

const UserContainer = (props) => {

    const [showDetail, setShowDetail] = useState(false)
    const [formType, setFormType] = useState("")
    const [selectedData, setSelectedData] = useState({})

    const loadData = () => {
        getUser(1, 10).then((result) => {
            props.setListUser(result.payload)
        })
    }

    const loadJobsData = () => {
        getJobs().then((result) => {
            props.setListJobs(result.payload)
        })
    }

    const loadEducationData = () => {
        getEducation().then((result) => {
            props.setListEducation(result.payload)
        })
    }

    useEffect(() => {
        loadData()
        loadJobsData()
        loadEducationData()
    },)

    const createData = (value) => {
        console.log(value)
        // postMenu(menu,token).then((response)=>{
        //     if (response.status===201){
        //         showAlert('success','Successfull Insert Menu')
        //         setSelectedData({})
        //         setShowDetail(!showDetail)
        //         setCustomPagination({
        //             ...customPagination,
        //             totalData: customPagination.totalData + 1
        //         })
        //         loadData()
        //     }
        // }).catch((error)=>{
        //     showAlert('error','Error Insert data')
        //     setShowDetail(!showDetail)
        // })
    }

    const updateData = (id, value) => {
        console.log(value)
        console.log(id)
        // updateMenu(menuId,menu,token).then((response)=>{
        //     if (response.status === 200){
        //         showAlert('success','Successfull Update Menu')
        //         setSelectedData({})
        //         setShowDetail(!showDetail)
        //     }
        //     loadData()
        // }).catch((error)=>{
        //     showAlert('error','Error Edited data')
        //     setShowDetail(!showDetail)
        // })
    }


    const deleteData = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                deleteUser(id).then((response) => {
                    if (response.statusCode === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then(r => r.dismiss)
                        loadData()
                    }
                }).catch(() => {
                    Swal.fire(
                        'Error!',
                        'Error Deleted File',
                        'error'
                    ).then(r => r.dismiss)
                })
            }
        })
    }

    const showModals = (formType, value) => {
        if (formType === "Create") {
            value = {}
        }
        setShowDetail(!showDetail)
        setSelectedData(value)
        setFormType(formType)
    }

    const hideDetail = () => {
        setSelectedData({})
        setShowDetail(!showDetail)
    }

    return (
        <Container>
            <div className="table-bordered container-table mt-5">
                <UserForm
                    formType={formType}
                    editedData={selectedData}
                    create={(menu) => createData(menu)}
                    update={(menuId, menu) => updateData(menuId, menu)}
                    show={showDetail}
                    hide={() => hideDetail()}
                />
                <div className="container-action">
                    <Button variant="outline-primary">
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/>Add User
                    </Button>
                </div>
                <div className="container-list">
                    <UserList
                        edited={(value) => showModals("Edit", value)}
                        showDetail={(value) => showModals("Detail", value)}
                        deleted={(id) => deleteData(id)}
                    />
                </div>
                <div className="container-pagination">
                    <Pagination>
                        <Pagination.First/>
                        <Pagination.Last/>
                    </Pagination>
                </div>
            </div>
        </Container>
    );
};

const mapDispatchToProps = {
    setListUser: setListUser,
    setListJobs: setListJob,
    setListEducation: setListEducation,
}

export default connect(null, mapDispatchToProps)(UserContainer);