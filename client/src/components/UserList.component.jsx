import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import DataTable from './Tables/UserDataTable'
import UserService from "../services/user.service"
import { connect } from 'react-redux'
import ToastAlert from './Toast/Toast'
import HouseCard from './Card/HouseCard'
import ModalForm from './Modals/AddUserModal'
import { setMenu } from '../store/actions'
import axios from "axios"
import { config } from '../config.js'
import { FaSearch } from 'react-icons/fa'
import Input from "react-validation/build/input"
import Form from "react-validation/build/form"

class UserList extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            totalLength: 0,
            loading: false,
            page: 0,
            prevY: 0,
            items: [],
            searchValue: '',
            toastShow: false
        };
        this.searchOnChange = this.searchOnChange.bind(this);
    }

    searchOnChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    getTotalLength() {
        UserService.getHouseLength().then(
            response => {
                if (response.data.status == "success") {
                    this.setState({
                        totalLength: response.data.data
                    });
                } else {
                    this.setState({ totalLength: 0 })
                }
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    componentDidMount() {
        this.props.dispatch(setMenu(2));
        this.getTotalLength();
        this.getPhotos(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    getPhotos(page) {
        this.setState({ loading: true });
        UserService.getHouses(page).then(
            response => {
                this.setState({ loading: false });
                if (response.data.status == "success") {
                    this.setState({ photos: [...this.state.photos, ...response.data.data] });
                    this.setState({ page: page + 1 });
                }
            },
            error => {
                this.setState({ loading: false });
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const curPage = this.state.page;
            if (curPage * 12 < this.state.totalLength) {
                this.getPhotos(curPage);
            }
        }
        this.setState({ prevY: y });
    }

    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };

        // To change the loading icon behavior
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
        const filterPhotos = this.state.photos.filter(photo => {
            return photo.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })

        return (
            <div className="component-container">
                <div className="container">
                    <Container className="App">
                        <Row>
                            <Col>
                                <Form className="component-header-form">
                                    <h1 className="component-title">List of Houses</h1>
                                    <div className="search">
                                        <FaSearch />
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search"
                                            value={this.state.searchValue}
                                            onChange={this.searchOnChange}
                                        />
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="component-toolbar">
                            <Col className="flex">
                                <div className="toolbar-button views-color">+ 200 Views</div>
                                <div className="toolbar-button hires-color ml-20">+ 10 Hires</div>
                                <div className="toolbar-button contacts-color ml-20">+ 70 Contacts</div>
                            </Col>
                        </Row>
                        <Row className="component-toolbar">
                            <Col>
                                <div className="house-container overflow-scroll scrollbar-hidden">
                                    {filterPhotos.map(photo => (
                                        <HouseCard image={photo.image_url} name={photo.name} reference={photo.reference} />
                                    ))}

                                    <div
                                        ref={loadingRef => (this.loadingRef = loadingRef)}
                                        style={loadingCSS}
                                    >
                                        <span style={loadingTextCSS}>Loading...</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <ToastAlert show={this.state.toastShow} description={this.state.alertDescription}></ToastAlert>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => state.admin;

export default connect(mapStateToProps)(UserList);