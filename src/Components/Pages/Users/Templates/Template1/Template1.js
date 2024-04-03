import React from 'react';
import jwt_decode from "jwt-decode";
import SiteHeader from "./../../../../Header/HeaderUser";
import editTemplate from './../../../../Assets/images/User/Home/edit-template-title.svg';
import Scene from './../../../../Assets/images/User/Home/scene1.png';
import Scene2 from './../../../../Assets/images/User/Home/scene2.png';
import Scene3 from './../../../../Assets/images/User/Home/scene3.png';
import Scene4 from './../../../../Assets/images/User/Home/scene4.png';
import trashIcon from './../../../../Assets/images/User/Home/trash.svg';
import ungroupIcon from './../../../../Assets/images/User/Home/ungroup.svg';
import addBlockImg from './../../../../Assets/images/User/Home/add-block.svg';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from 'universal-cookie';
import Loader from "./../../../../Utility/Loader/Loader";
import { apigetTemplate, apideleteBlock, apiAddBlock } from './../../../../Utility/Utility'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const TemplateOne = (props) => {
    const [userId, setUserId] = React.useState('');
    const [processing, setProcessing] = React.useState(false);
    const [blockCount, setblockCount] = React.useState('1');
    const [blockToDelete, setblockToDelete] = React.useState('');
    const [templateId, setTemplateId] = React.useState('');
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);
    function getData() {
        setProcessing(true);
        const cookies = new Cookies();
        const token = cookies.get('token');
        const decoded = jwt_decode(token);
        setUserId(decoded.id);
        axios.get(`${apigetTemplate}`, {
            params: {
                userId: decoded.id,
                templateNumber: '1',
            }
        }).then(function (response) {
            setProcessing(false);
            // console.log(response.data.data['0']._id)
            if (typeof response.data.data['0'] != 'undefined') {
                setTemplateId(response.data.data['0']._id);
                setblockCount(response.data.data['0'].blocks.length);
            }

        });
    }
    React.useEffect(() => {
        getData()
    }, []);
    function addBlock(e) {

        e.preventDefault();
        if (blockCount < 4) {
            setProcessing(true);
            axios.post(`${apiAddBlock}`, {
                blockId: blockCount + 1,
                templateId: templateId,
                userId: userId,
                templateNumber: '1',
            }).then(function (response) {
                setblockCount(blockCount + 1);
                setProcessing(false);
            });

        }
    }
    function confirmDelete(e) {
        setModal(!modal)
        setblockToDelete(e);
        //  setProcessing(true);
    }
    function deleteBlock(e) {
        setModal(!modal);
        setProcessing(true);
        let blockId = blockToDelete;
        axios.delete(`${apideleteBlock}`, {
            params: {
                templateId: templateId,
                blockId: blockId,
            }
        }).then(function (response) {
            //console.log(response.data.message)
            if (response.data.message) {
                setProcessing(false);
                getData()
            } else {
                setProcessing(false);
            }
        });
    }
    return (
        <div >
            <SiteHeader />
            <div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Delete Block</ModalHeader>
                    <ModalBody><p>Are you sure you want to delete this block?</p></ModalBody>
                    <ModalFooter>
                        <div className="container">
                            <div className="row modal-block">
                                <div className="col-12 col-sm-6">
                                    <Button color="primary" onClick={deleteBlock}>confirm</Button>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
            <Loader open={processing} />
            <div className="container-fluid user-home">
                <div className="row first-row ">
                    <div className="col-sm-6 col-12">
                        <img src={editTemplate} />
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="d-flex left-content">   <img onClick={addBlock} src={addBlockImg} /> <h2>My First Template</h2></div>
                    </div>
                </div>
                <div className="second-row row">
                    <div className="col-12">

                        <div className="inner-box">
                            <div className="row">
                                <div className="col-12 col-sm-3">
                                    <div className="template-box">
                                        <div className="img-bg bg" style={{ 'backgroundImage': 'url(' + Scene + ') ' }}>
                                        </div>
                                        <h5>Block 1</h5>
                                        <div className="btn-section d-flex">
                                            <div className="img-section">
                                                <img src={ungroupIcon} />
                                            </div>
                                            <Link to="/edit-template/block/1">Edit</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12  col-sm-3">
                                    {blockCount >= 2 ?
                                        <div className="template-box">
                                            <div className="img-bg bg" style={{ 'backgroundImage': 'url(' + Scene2 + ') ' }}>
                                            </div>
                                            <h5>Block 2</h5>
                                            <div className="btn-section d-flex">
                                                <div className="img-section">
                                                    <img src={ungroupIcon} />
                                                    {blockCount <= 2 ? <img onClick={() => confirmDelete(2)} src={trashIcon} /> : null}
                                                </div>
                                                <Link to="/edit-template/block/2">Edit</Link>
                                            </div>
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className="col-12  col-sm-3">
                                    {blockCount >= 3 ?
                                        <div className="template-box">
                                            <div className="img-bg bg" style={{ 'backgroundImage': 'url(' + Scene3 + ') ' }}>
                                            </div>
                                            <h5>Block 3</h5>
                                            <div className="btn-section d-flex">
                                                <div className="img-section">
                                                    <img src={ungroupIcon} />
                                                    {blockCount <= 3 ? <img onClick={() => confirmDelete(3)} src={trashIcon} /> : null}
                                                </div>
                                                <Link to="/edit-template/block/3">Edit</Link>
                                            </div>
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className="col-12  col-sm-3">
                                    {blockCount == 4 ?
                                        <div className="template-box">
                                            <div className="img-bg bg" style={{ 'backgroundImage': 'url(' + Scene4 + ') ' }}>
                                            </div>
                                            <h5>Block 4</h5>
                                            <div className="btn-section d-flex">
                                                <div className="img-section">
                                                    <img src={ungroupIcon} />
                                                    <img onClick={() => confirmDelete(4)} src={trashIcon} />
                                                </div>
                                                <Link to="/edit-template/block/4">Edit</Link>
                                            </div>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default TemplateOne