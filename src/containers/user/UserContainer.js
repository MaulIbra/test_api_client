import React, {useEffect} from 'react';
import {deleteUser, getUser} from '../../api/UserService'
import {setListUser} from "../../redux/action/User";
import {connect} from "react-redux";
import UserList from "./UserList";
import {Button, Container, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const UserContainer = (props) => {

    const loadData =()=>{
        getUser(1,10).then((result)=>{
            props.setListUser(result.payload)
        })
    }

    useEffect(()=>{
        loadData()
    },)


    const deleteData = (id)=>{
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
                deleteUser(id).then((response)=>{
                    if (response.statusCode === 200){
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then(r => r.dismiss)
                        loadData()
                    }
                }).catch(()=>{
                    Swal.fire(
                        'Error!',
                        'Error Deleted File',
                        'error'
                    ).then(r => r.dismiss)
                })
            }
        })
    }

    return (
        <Container>
            <div className="table-bordered container-table mt-5">
                <div className="container-action">
                    <Button variant="outline-primary">
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/>Add User
                    </Button>
                </div>
                <div className="container-list">
                    <UserList
                        deleted={(id)=>deleteData(id)}
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
    setListUser : setListUser
}

export default connect(null,mapDispatchToProps)(UserContainer);