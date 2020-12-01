import React, {useEffect, useState} from 'react';
import {deleteUser, getEducation, getJobs, getUser, postUser, updateUser} from '../../api/UserService'
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
import {showAlert} from "../../component/AlertComponent";

const UserContainer = (props) => {

    const [showDetail, setShowDetail] = useState(false)
    const [formType, setFormType] = useState("")
    const [selectedData, setSelectedData] = useState({})
    const [dataError,setDataError] = useState({})
    const [page, setPage] = useState({
        currentPage: 1,
        firstPage: 1,
        lastPage: 0,
        totalData: 0,
        limit: 5
    })

    const loadData = () => {
        getUser(page.currentPage, page.limit,sessionStorage.getItem('token')).then((result) => {
            if (result.payload.users === undefined){
                props.setListUser([])
            }else{
                props.setListUser(result.payload.users)
            }
            setPage({
                ...page,
                currentPage: result.payload.metadata.currentPage,
                firstPage: result.payload.metadata.firstPage,
                lastPage: result.payload.metadata.lastPage,
                totalData: result.payload.metadata.totalData
            })
        })
    }

    const loadJobsData = () => {
        getJobs(sessionStorage.getItem('token')).then((result) => {
            props.setListJobs(result.payload)
        })
    }

    const loadEducationData = () => {
        getEducation(sessionStorage.getItem('token')).then((result) => {
            props.setListEducation(result.payload)
        })
    }

    useEffect(() => {
        loadData()
        loadJobsData()
        loadEducationData()
    },// eslint-disable-next-line
        [page.currentPage])


    const createData = (value) => {
        postUser(value,sessionStorage.getItem('token')).then((response) => {
            if (response.statusCode === 201) {
                showAlert('success', 'Successfull Insert Menu')
                setSelectedData({})
                setDataError({})
                setShowDetail(!showDetail)
                loadData()
            }
        }).catch((error) => {
            if(error.response.data.statusCode === 400){
                setSelectedData(error.response.data.payload)
                setDataError(error.response.data.payload)
            }else{
                showAlert('error', 'Error Insert data')
                setShowDetail(!showDetail)
            }
        })
    }

    const updateData = (id, value) => {
        updateUser(id, value,sessionStorage.getItem('token')).then((response) => {
            if (response.statusCode === 200) {
                showAlert('success', 'Successfull Update Menu')
                setSelectedData({})
                setDataError({})
                setShowDetail(!showDetail)
            }
            loadData()
        }).catch((error) => {
            if(error.response.data.statusCode === 400){
                setSelectedData(error.response.data.payload)
                setDataError(error.response.data.payload)
            }else{
                showAlert('error', 'Error Insert data')
                setShowDetail(!showDetail)
            }
        })
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
                deleteUser(id,sessionStorage.getItem('token')).then((response) => {
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
        setShowDetail(!showDetail)
        setSelectedData({})
        setDataError({})
    }

    const pageClick = (i)=>{
        if (i >= page.firstPage && i <= page.lastPage){
            setPage({
                ...page,
                currentPage: i
            })
        }
    }

    let pagination = []
    for (let i = 1; i <= page.lastPage; i++) {
        if (i === page.currentPage) {
            pagination.push(<Pagination.Item active key={i}>{i}</Pagination.Item>)
        } else {
            pagination.push(<Pagination.Item key={i} onClick={() => pageClick(i)}>{i}</Pagination.Item>)
        }
    }


    return (
        <Container>
            <div className="table-bordered container-table mt-5">
                <UserForm
                    formType={formType}
                    editedData={selectedData}
                    errorData={dataError}
                    create={(menu) => createData(menu)}
                    update={(menuId, menu) => updateData(menuId, menu)}
                    show={showDetail}
                    hide={() => hideDetail()}
                />
                <div className="container-action">
                    <Button variant="outline-primary" onClick={() => showModals("Create")}>
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
                    <div className="container-pagination">
                        <Pagination>
                            <Pagination.First onClick={()=>pageClick(page.currentPage-1)}/>
                            {pagination}
                            <Pagination.Last onClick={()=>pageClick(page.currentPage+1)}/>
                        </Pagination>
                    </div>
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