import React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { VideoEditor } from 'video-editor';
import "react-video-trimmer/dist/style.css";
import ReactVideoTrimmer from "react-video-trimmer";
import { preloadWebVideo } from "react-video-trimmer";
import Dropzone from "react-dropzone";
import jwt_decode from "jwt-decode";
import CancelIcon from '@material-ui/icons/Cancel';
import Loader from "./../../../../../Utility/Loader/Loader";
import SiteHeader from "./../../../../../Header/HeaderUser";
import mediaIcon from './../../../../../Assets/images/User/Template/media.svg';
import filtersIcon from './../../../../../Assets/images/User/Template/filters.svg';
import musicIcon from './../../../../../Assets/images/User/Template/music.svg';
import designIcon from './../../../../../Assets/images/User/Template/design.svg';
import uploadIcon from './../../../../../Assets/images/User/Template/upload-media.svg';
import titleIcon from './../../../../../Assets/images/User/Template/edit-template-title.svg';
import previewIcon from './../../../../../Assets/images/User/Header/preview.svg';
import Scene from './../../../../../Assets/images/User/Home/scene.png';
import { SketchPicker } from 'react-color';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { apiUploadImage, apiPath, apiAddTemplate, apiAddBlock, apiPreviewVideo } from './../../../../../Utility/Utility'
import FilerobotImageEditor from 'filerobot-image-editor';
const Block4 = (props) => {
    const [userId, setUserId] = React.useState('');
    const [mediaClick, setMediaClick] = React.useState(false);
    const [designClick, setDesignClick] = React.useState(false);
    const [filtersClick, setFiltersClick] = React.useState(false);
    const [musicClick, setMusicClick] = React.useState(false);
    const [titleColor, setTitleColor] = React.useState('black');
    const [titleColorShow, setTtitleColorShow] = React.useState(false);
    const [subtitleColor, setsubTitleColor] = React.useState('black');
    const [subtitleColorShow, setsubTtitleColorShow] = React.useState(false);
    const [blockTitle, setBlockTitle] = React.useState();
    const [blocksubTitle, setBlocksubTitle] = React.useState();
    const [checkBlockTitle, setCheckBlockTitle] = React.useState(false);
    const [blocktitleFontsize, setBlockTitleFontsize] = React.useState('');
    const [blocksubTitleFontsize, setBlocksubTitleFontsize] = React.useState('');
    const [show, toggle] = React.useState(false);

    const [imageOne, setImageOne] = React.useState('');
    const [imageTwo, setImageTwo] = React.useState('');
    const [imageThree, setImageThree] = React.useState('');
    const [imageFour, setImageFour] = React.useState('');

    const [videoOne, setVideoOne] = React.useState('');
    const [videoTwo, setVideoTwo] = React.useState('');
    const [videoThree, setVideoThree] = React.useState('');
    const [videoFour, setVideoFour] = React.useState('');

    const [buttonCheck, setButtonCheck] = React.useState(false);
    const [containerOne, setContainerOne] = React.useState('');
    const [containerTwo, setContainerTwo] = React.useState('');
    const [containerThree, setContainerThree] = React.useState('');
    const [containerFour, setContainerFour] = React.useState('');

    const [editVideo, setEditVideo] = React.useState('');
    const [editImage, setEditImage] = React.useState('');
    const [imageOneCheck, setImageOneCheck] = React.useState(false);
    const [imageTwoCheck, setImageTwoCheck] = React.useState(false);
    const [imageThreeCheck, setImageThreeCheck] = React.useState(false);
    const [imageFourCheck, setImageFourCheck] = React.useState(false);
    const [globalFont, setGlobalFont] = React.useState("'Montserrat', sans-serif");
    const [globalTitleSize, setGlobalTitleSize] = React.useState('');
    const [globalsubTitleSize, setGlobalSubTitleSize] = React.useState('');
    const [templateIdStored, setTemplateIdStored] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [errorCheck, setErrorCheck] = React.useState(false);
    const [errorCheckNumber, setErrorCheckNumber] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [videoSuccess, setVideoSuccess] = React.useState(false);
    const [videoError, setVideoError] = React.useState(false);
    const [videoUrl, setVideoUrl] = React.useState('');
    const [loaderCheck, setLoaderCheck] = React.useState(false);
    const toggleModal = () => setModal(!modal);
    // Image Edior Init 
    preloadWebVideo();
    const config = {
        tools: ['adjust', 'effects', 'filters', 'rotate', 'crop', 'resize', 'image', 'text'],
        theme: {
            colors: {
                primaryBg: '#00527E',
                primaryBgHover: '#637381',
                secondaryBg: '#0c6195',
                secondaryBgHover: '#C72928',
                text: '#F9FAFB',
                textHover: '#ffffff',
                textMute: '#aaaaaa',
                textWarn: '#f7931e',
                secondaryBgOpacity: 'rgba(0, 0, 0, 0.75)',
                border: '#00527E',
                borderLight: '#637381',
                tagsBackground: '#fb3640',
                buttonBackground: '#fb3640',
                hoverButtonBackground: '#E04241',
            }
        }
    };

    // After Apply Filter 
    const onComplete = function (newUrl) {
        let fileUrl = newUrl.message.replace(/\\/g, "/").substring("public".length);
        let imageUrl = fileUrl.replace('sets/', '');
        let updatedImage = imageUrl;
        setEditImage(updatedImage);
        if (imageOne === editImage) {
            setImageOne(updatedImage);
        }
        else if (imageTwo === editImage) {
            setImageTwo(updatedImage);
        }
        else if (imageThree === editImage) {
            setImageThree(updatedImage);
        }
        else if (imageFour === editImage) {
            setImageFour(updatedImage);
        }
        if (containerOne === editImage) {
            setContainerOne(updatedImage);
        }
        else if (containerTwo === editImage) {
            setContainerTwo(updatedImage);
        }
        else if (containerThree === editImage) {
            setContainerThree(updatedImage);
        }
        else if (containerFour === editImage) {
            setContainerFour(updatedImage);
        }
    };
    // eslint-disable-next-line
    const ImageEditor = new FilerobotImageEditor(config, onComplete);

    // Onload Functions 
    React.useEffect(() => {
        setProcessing(true);
        const cookies = new Cookies();
        const token = cookies.get('token');
        const decoded = jwt_decode(token);
        setUserId(decoded.id);
        axios.post(`${apiAddTemplate}`, {
            userId: decoded.id,
            templateNumber: '1',
        }).then(function (response) {
            setProcessing(false);
            console.log(response.data);
            if (response.data.data.length == 1) {
                setTemplateIdStored(response.data.data[0]._id);
                if (response.data.data[0].globalfontFamily) {
                    setGlobalFont(response.data.data[0].globalfontFamily)
                }
                if (response.data.data[0].globalFontTitle) {
                    setGlobalTitleSize(response.data.data[0].globalFontTitle)
                }
                if (response.data.data[0].globalFontSubTitle) {
                    setGlobalSubTitleSize(response.data.data[0].globalFontSubTitle)
                }
                if (response.data.data[0].blocks.length > 0) {
                    {
                        if (typeof response.data.data[0].blocks.blockData != 'undefined') {
                            response.data.data[0].blocks.map(block => {
                                if (block.blockId == 4) {
                                    console.log(block)
                                    setImageOne(block.blockData.imageOne);
                                    setImageTwo(block.blockData.imageTwo);
                                    setImageThree(block.blockData.imageThree);
                                    setImageFour(block.blockData.imageFour);
                                    setContainerOne(block.blockData.containerOne);
                                    setContainerTwo(block.blockData.containerTwo);
                                    setContainerThree(block.blockData.containerThree);
                                    setContainerFour(block.blockData.containerFour);

                                    setVideoOne(block.blockData.videoOne);
                                    setVideoTwo(block.blockData.videoTwo);
                                    setVideoThree(block.blockData.videoThree);
                                    setVideoFour(block.blockData.videoFour);

                                    setBlockTitle(block.blockData.blockTitle);
                                    setBlocksubTitle(block.blockData.blocksubTitle);
                                    setBlocksubTitleFontsize(block.blockData.blocksubTitleFontsize);
                                    setBlockTitleFontsize(block.blockData.blocktitleFontsize);
                                    setTitleColor(block.blockData.titleColor);
                                    setsubTitleColor(block.blockData.subtitleColor);
                                    if (block.blockData.imageOne != '') {
                                        setEditImage(block.blockData.imageOne);
                                    }
                                    else if (block.blockData.imageTwo != '') {
                                        setEditImage(block.blockData.imageTwo);
                                    }
                                    else if (block.blockData.imageThree != '') {
                                        setEditImage(block.blockData.imageThree);
                                    }
                                    else if (block.blockData.imageFour != '') {
                                        setEditImage(block.blockData.imageFour);
                                    }
                                    if (block.blockData.blockTitle) {
                                        setCheckBlockTitle(true);
                                    }
                                }
                            })
                        }
                    }
                }
            } else {
                setTemplateIdStored(response.data.data._id);
            }
        });
    }, []);

    // Filters Click
    function mediaBtnClick() {

        if (containerFour != '') {
            setErrorCheckNumber(true);
            setTimeout(function () { setErrorCheckNumber(false); }, 2000);
            setMediaClick(false);
            setDesignClick(false)
            setFiltersClick(false)
            setMusicClick(false)
        }
        else {
            setErrorCheckNumber(false)
            setMediaClick(!mediaClick);
            setDesignClick(false)
            setFiltersClick(false)
            setMusicClick(false)
        }
    }
    function designBtnClick() {
        setMediaClick(false);
        setDesignClick(!designClick)
        setFiltersClick(false)
        setMusicClick(false)
    }
    function filterBtnClick() {
        setMediaClick(false);
        setDesignClick(false)
        setFiltersClick(!filtersClick)
        setMusicClick(false)
        toggle(true)
    }
    function musicBtnClick() {
        setMediaClick(false);
        setDesignClick(false)
        setFiltersClick(false)
        setMusicClick(!musicClick)
    }

    function handleChangeComplete(color) {
        setTitleColor(color.hex);
    };
    const toggleTitle = () => setTtitleColorShow(prevState => !prevState);
    function handleChangeCompletesubTitle(color) {
        setsubTitleColor(color.hex);
    };
    const togglesubTitle = () => setsubTtitleColorShow(prevState => !prevState);

    /**
    * Set Block Title
    * @param evt get the value of the field.
    * @returns na
    */
    function setblockTitle(evt) {
        if (evt === "") {
            setCheckBlockTitle(false);
        } else {
            setCheckBlockTitle(true);
        }
        setBlockTitle(evt);
    }
    function setblockTitleFontsize(e) {
        setBlockTitleFontsize(e);
    }
    function setblocksubTitleFontsize(e) {
        setBlocksubTitleFontsize(e);
    }
    /**
      * File Upload Function
      * @param evt get the value of the field.
      * @returns na
      */
    function setformImage(e) {
        //e.preventDefault();
        // eslint-disable-next-line 
        if (containerFour == '') {
            var parts = e.target.files[0].type.split("/");
            var result = parts[0];
            if (result == 'image') {
                setErrorCheck(false);
                if (e.target.files[0] != '') {
                    const data = new FormData();
                    data.append('image', e.target.files[0]);
                    // API Call 
                    setProcessing(true);
                    axios.post(`${apiUploadImage}`, data).then((response) => {
                        setProcessing(false);
                        let fileUrl = response.data.message.replace(/\\/g, "/").substring("public".length);
                        let imageUrl = fileUrl.replace('sets/', '');
                        let updatedImage = imageUrl;

                        if (containerOne == '') {
                            setContainerOne(updatedImage)
                        }
                        else if (containerTwo == '') {

                            setContainerTwo(updatedImage)
                        }
                        else if (containerThree == '') {

                            setContainerThree(updatedImage)
                        }
                        else if (containerFour == '') {

                            setContainerFour(updatedImage)
                        }
                        if (result == 'image') {
                            if (imageOne == '') {
                                setImageOne(updatedImage);
                                setEditImage(updatedImage);
                            }
                            else if (imageTwo == '') {
                                setImageTwo(updatedImage);
                            }
                            else if (imageThree == '') {
                                setImageThree(updatedImage);
                            }
                            else if (imageFour == '') {
                                setImageFour(updatedImage);
                            }
                        }
                    }).catch((error) => {
                    });
                }
            }
            else {
                setErrorCheck(true)
            }
            setErrorCheckNumber('false')
        } else {
            setErrorCheckNumber('true')
            setTimeout(function () { setErrorCheckNumber(false); }, 2000);
        }
    }
    /**
     * Get Thumbnail Click
     * @returns na
     */
    function thumbClick(img) {

        if (img == imageOne || img == imageTwo || img == imageThree || img == imageFour) {
            console.log(img)
            setEditImage(img);
            setEditVideo('');
        }
        else {
            setEditImage('');
            setEditVideo(img);
        }
        if (img == containerOne) {
            setImageOneCheck(true);
            setImageTwoCheck(false)
            setImageThreeCheck(false)
            setImageFourCheck(false)
        }
        else if (img == containerTwo) {
            setImageOneCheck(false);
            setImageTwoCheck(true)
            setImageThreeCheck(false)
            setImageFourCheck(false)
        }
        else if (img == containerThree) {

            setImageOneCheck(false);
            setImageTwoCheck(false)
            setImageThreeCheck(true)
            setImageFourCheck(false)
        }
        else if (img == containerFour) {

            setImageOneCheck(false);
            setImageTwoCheck(false)
            setImageThreeCheck(false)
            setImageFourCheck(true)
        }

    }

    function saveData(event) {
        setProcessing(true);
        event.preventDefault();
        const data = {
            imageOne: imageOne,
            imageTwo: imageTwo,
            imageThree: imageThree,
            imageFour: imageFour,
            containerOne: containerOne,
            containerTwo: containerTwo,
            containerThree: containerThree,
            containerFour: containerFour,

            videoOne: videoOne,
            videoTwo: videoTwo,
            videoThree: videoThree,
            videoFour: videoFour,
            blockTitle: blockTitle,
            blocksubTitle: blocksubTitle,
            blocktitleFontsize: blocktitleFontsize,
            blocksubTitleFontsize: blocksubTitleFontsize,
            titleColor: titleColor,
            subtitleColor: subtitleColor
        }
        axios.post(`${apiAddBlock}`, {
            blockId: '4',
            templateId: templateIdStored,
            blockData: data,
            userId: userId,
            templateNumber: '1',
            globalfontFamily: globalFont,
            globalFontTitle: globalTitleSize,
            globalFontSubTitle: globalsubTitleSize
        }).then(function (response) {
            console.log(response);
            setProcessing(false);
        });
    }
    function removeImg(img) {
        setErrorCheckNumber(false);
        if (img == imageOne) {
            setImageOne(imageTwo);
            setImageTwo(imageThree);
            setImageThree(imageFour);
            setImageFour('');
        }
        else if (img == imageTwo) {
            setImageTwo(imageThree);
            setImageThree(imageFour);
            setImageFour('');
        }
        else if (img == imageThree) {
            setImageThree(imageFour);
            setImageFour('');
        }
        else if (img == imageFour) {
            setImageFour('');
        }

        if (img == videoOne) {
            setVideoOne(imageTwo);
            setVideoTwo(imageThree);
            setVideoThree(imageFour);
            setVideoFour('');
        }
        else if (img == videoTwo) {
            setVideoTwo(imageThree);
            setVideoThree(imageFour);
            setVideoFour('');
        }
        else if (img == videoThree) {
            setVideoThree(imageFour);
            setVideoFour('');
        }
        else if (img == videoFour) {
            setVideoFour('');
        }

        if (img == editImage) {
            setEditImage('');
            setImageOneCheck(false);
            setImageTwoCheck(false)
            setImageThreeCheck(false)
            setImageFourCheck(false)
        }
        if (img == editVideo) {
            setEditVideo('');
            setImageOneCheck(false);
            setImageTwoCheck(false)
            setImageThreeCheck(false)
            setImageFourCheck(false)
        }

        if (img == imageFour && imageTwo == '' && imageThree == '' && imageFour == '') {
            setEditImage('');
        }

        if (img == containerOne) {
            setContainerOne(containerTwo);
            setContainerTwo(containerThree);
            setContainerThree(containerFour);
            setContainerFour('');
        }
        else if (img == containerTwo) {
            setContainerTwo(containerThree);
            setContainerThree(containerFour);
            setContainerFour('');
        }
        else if (img == containerThree) {
            setContainerThree(containerFour);
            setContainerFour('');
        }
        else if (img == containerFour) {
            setContainerFour('');
        }
    }

    var img1 = imageOne;
    var img2 = imageTwo;
    var img3 = imageThree;
    var img4 = imageFour;
    var container1 = containerOne;
    var container2 = containerTwo;
    var container3 = containerThree;
    var container4 = containerFour;

    const handleDrop = acceptedFiles => {

        let fileUrl, imageUrl, updatedImage;
        acceptedFiles.map((file, index) => {
            console.log(index);
            var parts = file.type.split("/");
            var result = parts[0];
            if (result == 'image') {
                if (file != '') {
                    const data = new FormData();
                    data.append('image', file);
                    // API Call 
                    setProcessing(true);
                    axios.post(`${apiUploadImage}`, data).then((response) => {
                        setProcessing(false);
                        fileUrl = response.data.message.replace(/\\/g, "/").substring("public".length);
                        imageUrl = fileUrl.replace('sets/', '');
                        updatedImage = imageUrl;
                        if (container1 == '') {
                            container1 = updatedImage;
                            setContainerOne(updatedImage)
                        }
                        else if (container2 == '') {

                            container2 = updatedImage;
                            setContainerTwo(updatedImage)
                        }
                        else if (container3 == '') {
                            container3 = updatedImage;
                            setContainerThree(updatedImage)
                        }
                        else if (container4 == '') {
                            container4 = updatedImage;
                            setContainerFour(updatedImage)
                        }
                        if (result == 'image') {
                            if (img1 == '') {
                                img1 = updatedImage;
                                setImageOne(updatedImage);
                                setEditImage(updatedImage);
                            }
                            else if (img2 == '') {
                                img2 = updatedImage;
                                setImageTwo(updatedImage);
                            }
                            else if (img3 == '') {
                                img3 = updatedImage;
                                setImageThree(updatedImage);
                            }
                            else if (img4 == '') {
                                img4 = updatedImage;
                                setImageFour(updatedImage);
                            }
                        }
                        setMediaClick(false);
                    }).catch((error) => {
                    });
                }
            }
        })
    }
    function setbuttonCheck(e) {
        setButtonCheck(!buttonCheck);
        setMediaClick(!mediaClick);
        setDesignClick(false)
        setFiltersClick(false)
        setMusicClick(false)
        i = 1;
    }
    var i = 1;
    const handleVideoEncode = React.useCallback(result => {
        if (i == 1) {
            i = 2;
            let fileUrl, imageUrl, updatedImage;
            let buffer = result['0'].data;
            var datas = new Blob([new Uint8Array(buffer, 0, buffer.byteLength)], {
                name: "trimmed.mp4",
                type: "video/mp4",
            });
            var fileOfBlob = new File([datas], 'trimmed.mp4');
            console.log(datas)
            const data = new FormData();
            data.append('image', fileOfBlob);
            // API Call  
            setProcessing(true);
            axios.post(`${apiUploadImage}`, data).then((response) => {
                setButtonCheck(!buttonCheck)
                setProcessing(false);
                fileUrl = response.data.message.replace(/\\/g, "/").substring("public".length);
                imageUrl = fileUrl.replace('sets/', '');
                updatedImage = imageUrl;
                console.log(updatedImage);
                if (containerOne == '') {
                    setContainerOne(updatedImage)
                }
                else if (containerTwo == '') {
                    setContainerTwo(updatedImage)
                }
                else if (containerThree == '') {
                    setContainerThree(updatedImage)
                }
                else if (containerFour == '') {
                    setContainerFour(updatedImage)
                }
                if (videoOne == '') {
                    setVideoOne(updatedImage);
                }
                else if (videoTwo == '') {

                    setVideoTwo(updatedImage);
                }
                else if (videoThree == '') {
                    setVideoThree(updatedImage);
                }
                else if (videoFour == '') {
                    setVideoFour(updatedImage);
                }

            }).catch((error) => {
            });

        }
    });
    function previewClick(e) {
        setDisabled(true)
        e.preventDefault();
        setLoaderCheck(true);
        setModal(!modal)
        setVideoError(false);
        setVideoUrl(false)
        axios.post(`${apiPreviewVideo}`, {
            templateId: templateIdStored,
        }).then(function (response) {
            console.log(response);
            setLoaderCheck(false);
            setDisabled(false);
            if (modal == false) {
                setModal(true)
            }
            if (response.data.message == 'Video failed') {
                setVideoError(true);
            } else {
                setVideoSuccess(true)
                setVideoUrl(response.data.data)
            }
        });
    }
    const {
        buttonLabel,
        className
    } = props;
    return (
        <div >
            <SiteHeader />
            <Loader open={processing} />
            <button onClick={previewClick} disabled={disabled} className="preview-btn"><img src={previewIcon} alt="Preview" /></button>
            <div className="modal-wrapper">
                <Modal modalClassName=" modal-wrapper" isOpen={modal} toggle={toggleModal} className={className}>
                    <ModalHeader toggle={toggleModal}> Your Video is Rendering...</ModalHeader>
                    <ModalBody>
                        {videoError ? (<div className="alert alert-danger" >Error! Unable to create video. </div>) : null}
                        {loaderCheck ?
                            <div className="loader-wrapper">
                                <div>Please Wait</div><div className="loader">Loading...</div>
                            </div>
                            : null}
                        {videoUrl ? <video key={videoUrl} className="video-container video-container-overlay" autoPlay={true} controls={true} loop="" muted={true} >
                            <source type="video/mp4" src={apiPath + videoUrl} />
                        </video> : <img src={Scene} alt="scene" />}
                    </ModalBody>
                </Modal>
            </div>
            <div className="edit-block-wrapper d-flex">
                <div className="sidebar">
                    <div className="sidebar-items ">
                        <div className={mediaClick ? "item active" : "item"} onClick={mediaBtnClick}>
                            <img src={mediaIcon} alt="Media tab" />
                        </div>
                        <div className={designClick ? "item active" : "item"} onClick={designBtnClick} >
                            <img src={designIcon} alt="Design tab" />
                        </div>
                        <div className={filtersClick ? "item active" : "item"} onClick={filterBtnClick} >
                            <img src={filtersIcon} alt="Filter tab" />
                        </div>
                        <div className={musicClick ? "item active" : "item"} onClick={musicBtnClick}>
                            <img src={musicIcon} alt="Music tab" />
                        </div>
                    </div>
                    <div className={mediaClick ? "sidebar-pane active" : "sidebar-pane"}>
                        <div className="upload-media">
                            <div className="toggle-group">
                                <input type="checkbox" name="on-off-switch" checked={buttonCheck} onChange={e => setbuttonCheck(e.currentTarget.value)} />
                                <label htmlFor="on-off-switch">
                                    Video
                                </label>
                                <div className="onoffswitch pull-right" >
                                    <div className="onoffswitch-label">
                                        <div className="onoffswitch-inner"></div>
                                        <div className="onoffswitch-switch"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-upload">
                                <input type="file" id="file" onChange={e => setformImage(e)} aria-label="File browser" />
                                <img src={uploadIcon} alt="Upload tab" />
                            </div>
                            <div className="upload-pane">
                                <Dropzone accept="image/*, video/*" onDrop={handleDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>
                                            <input {...getInputProps()} />
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    <div className={designClick ? "sidebar-pane active" : "sidebar-pane"}>
                        <div className="upload-media design-pane">
                            <div className="title">Color</div>
                            <div className="color-explanation">Changes made here will be applied to your entire video.</div>
                            <div className="separator separator-1"></div>
                            <div className=" color-section title-color-section">
                                <span >Title</span>
                                <div className="color-section-color title-color"></div>
                            </div>
                            <div className=" color-section subtitle-color-section"><span >Subtitle</span> <div className="color-section-color subtitle-color"></div></div>
                            <div className=" color-section video-back-color-section"><span >Video Background</span> <div className="color-section-color video-back-color"></div></div>
                            <div className="separator separator-1"></div>
                            <div className="title title-size">Text Size</div>
                            <div className=" size-section title-size-section"><span >Title</span> <input type="range" onChange={e => setGlobalTitleSize(e.target.value)} min="20" max="30" className="custom-range" /></div>
                            <div className=" size-section subtitle-size-section"><span >Subtitle</span> <input type="range" onChange={e => setGlobalSubTitleSize(e.target.value)} min="20" max="30" className="custom-range" /></div>
                            <div className="separator separator-1 seprate-3"></div>
                            <div className="title title-size">FONT</div>
                            <div className="text-size">Standard Fonts</div>
                            <div className="font-wrapper">
                                <div className="font-selector">
                                    <label className="radio">
                                        Montserrat<input onChange={e => setGlobalFont(e.target.value)} value="'Montserrat', sans-serif" type="radio" name="font"  ></input><span className="checkmark"></span></label>
                                </div>
                                <div className="font-selector">
                                    <label className="radio">
                                        Lato<input type="radio" name="font" onChange={e => setGlobalFont(e.target.value)} value="'Lato', sans-serif" checked={globalFont == "'Lato', sans-serif" ? true : false}  ></input><span className="checkmark"></span></label>
                                </div>
                                <div className="font-selector">
                                    <label className="radio">
                                        Oswald <input type="radio" name="font" onChange={e => setGlobalFont(e.target.value)} checked={globalFont == "'Oswald', sans-serif" ? true : false} value="'Oswald', sans-serif"  ></input><span className="checkmark"></span></label>
                                </div>
                                <div className="font-selector">
                                    <label className="radio">
                                        Roboto <input type="radio" name="font" onChange={e => setGlobalFont(e.target.value)} checked={globalFont == "'Roboto', sans-serif" ? true : false} value="'Roboto', sans-serif"  ></input><span className="checkmark"></span></label>
                                </div>
                                <div className="font-selector">
                                    <label className="radio">
                                        Noto  <input type="radio" name="font" onChange={e => setGlobalFont(e.target.value)} checked={globalFont == "'Noto Serif', serif" ? true : false} value="'Noto Serif', serif"></input><span className="checkmark"></span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="d-flex justify-content-between header-content">
                        <img src={titleIcon} alt="Title" />
                        <button className="btn button" onClick={saveData}>Save</button>
                    </div>
                    {errorCheck ? (<div className="alert alert-danger" >Invalid file! Please select correct format</div>) : null}
                    {errorCheckNumber ? (<div className="alert alert-danger" >All Sections are occupied. Please remove and then upload. </div>) : null}
                    <div className="slider-panel">

                        <div className="main-img bg">

                            <div className={buttonCheck ? 'show video-trimmer' : "video-trimmer"}>
                                <ReactVideoTrimmer
                                    maxSize={100000024}
                                    loadingFFMPEGText="Loading required libs..."
                                    timeLimit={30}
                                    timeRange={5}
                                    showEncodeBtn
                                    onVideoEncode={handleVideoEncode}
                                />
                            </div>
                            <div className={buttonCheck ? ' img-section-bottom' : "show img-section-bottom"}>
                                {editVideo != '' ? <video key={editVideo} className="video-container video-container-overlay" autoPlay="" controls={true} loop="" muted={true} >
                                    <source type="video/mp4" src={apiPath + editVideo} />
                                </video>
                                    : null}
                                {editImage != '' ?
                                    <div>

                                        <img src={apiPath + editImage} alt="Edit" />
                                        <FilerobotImageEditor
                                            show={show}
                                            config={config}
                                            src={apiPath + editImage}
                                            onClose={() => { toggle(false) }}
                                            onComplete={onComplete}
                                        />
                                    </div>
                                    : null}
                                {checkBlockTitle ?
                                    <div className="text-wrapper block-4">
                                        <div className="title" style={{ color: titleColor, 'fontSize': blocktitleFontsize + 'px', 'fontFamily': globalFont }}>
                                            {blockTitle}
                                        </div>
                                    </div>
                                    : null}
                            </div>


                        </div>
                        <div className="slider-nav">
                            {containerOne == imageOne || containerOne == imageTwo || containerOne == imageThree || containerOne == imageFour ?
                                <div className={imageOneCheck ? 'img-one thumbnail bg active' : 'img-one thumbnail bg'}>
                                    {containerOne != '' ? <div><CancelIcon onClick={() => removeImg(containerOne)} /><img alt="Thumbnail" src={apiPath + containerOne} onClick={() => thumbClick(containerOne)} /></div> : null}
                                </div>
                                : <div className={imageOneCheck ? 'img-one thumbnail bg active' : 'img-one thumbnail bg'}>
                                    {containerOne != '' ? <div><CancelIcon onClick={() => removeImg(containerOne)} /> <div className="video-wrappers" onClick={() => thumbClick(containerOne)}> <VideoEditor src={apiPath + containerOne} controls="false" muted={true} /></div> </div> : null}
                                </div>}
                            {containerTwo == imageOne || containerTwo == imageTwo || containerTwo == imageThree || containerTwo == imageFour ?
                                <div className={imageTwoCheck ? 'img-one thumbnail bg active' : 'img-one thumbnail bg'}>
                                    {containerTwo != '' ? <div><CancelIcon onClick={() => removeImg(containerTwo)} /><img alt="Thumbnail" src={apiPath + containerTwo} onClick={() => thumbClick(containerTwo)} /></div> : null}
                                </div>
                                : <div className={imageTwoCheck ? 'img-one thumbnail bg active' : 'img-one thumbnail bg'}>
                                    {containerTwo != '' ? <div><CancelIcon onClick={() => removeImg(containerTwo)} /> <div className="video-wrappers" onClick={() => thumbClick(containerTwo)}><VideoEditor src={apiPath + containerTwo} controls="false" muted={true} /></div> </div> : null}
                                </div>}
                            {containerThree == imageOne || containerThree == imageTwo || containerThree == imageThree || containerThree == imageFour ?
                                <div className={imageThreeCheck ? 'img-one thumbnail bg active' : 'img-one thumbnail bg'}>
                                    {containerThree != '' ? <div><CancelIcon onClick={() => removeImg(containerThree)} /><img alt="Thumbnail" src={apiPath + containerThree} onClick={() => thumbClick(containerThree)} /></div> : null}
                                </div>
                                : <div className={imageThreeCheck ? 'img-one thumbnail bg active' : 'img-one thumbnail bg'}>
                                    {containerThree != '' ? <div><CancelIcon onClick={() => removeImg(containerThree)} /><div className="video-wrappers" onClick={() => thumbClick(containerThree)}> <VideoEditor src={apiPath + containerThree} controls="false" muted={true} /></div></div> : null}
                                </div>}
                            {containerFour == imageOne || containerFour == imageTwo || containerFour == imageThree || containerFour == imageFour ?
                                <div className={imageFourCheck ? 'img-one thumbnail bg active' : 'img-one thumbnail bg'}>
                                    {containerFour != '' ? <div><CancelIcon onClick={() => removeImg(containerFour)} /><img alt="Thumbnail" src={apiPath + containerFour} onClick={() => thumbClick(containerFour)} /></div> : null}
                                </div>
                                : <div className={imageFourCheck ? 'img-one thumbnail bg active' : 'img-one thumbnail bg'}>
                                    {containerFour != '' ? <div><CancelIcon onClick={() => removeImg(containerFour)} /> <div className="video-wrappers" onClick={() => thumbClick(containerFour)}><VideoEditor src={apiPath + containerFour} controls="false" muted={true} /></div> </div> : null}
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="pane-wrapper">
                    <div className="enter-text">
                        <div className="title section-title">Enter Text</div>
                        <textarea value={blockTitle} onChange={e => setblockTitle(e.currentTarget.value)} placeholder="So how should you price you house?" className="form-control text-area title"></textarea>
                        <textarea placeholder="Second Title" value={blocksubTitle} onChange={e => setBlocksubTitle(e.currentTarget.value)} className="form-control title text-area subtitle" ></textarea>
                    </div>
                    <div className="font-size title">
                        <div className="section-title">Font Size</div>
                        <div className="font-size-title"> First Title<input onChange={e => setblockTitleFontsize(e.target.value)} type="range" min="20" max="30" className="custom-range" /></div>
                        <div className="font-size-subtitle">Second Title<input onChange={e => setblocksubTitleFontsize(e.target.value)} min="20" max="30" type="range" className="custom-range" /></div>
                    </div>
                    <div className="color title">
                        <div className="section-title">Color</div>
                        <div className="color-title">First Title
                        <div className="custom-btn color-selector" style={{ backgroundColor: titleColor }} onClick={toggleTitle}>
                            </div>
                            {titleColorShow ?
                                <SketchPicker
                                    color={titleColor}
                                    onChangeComplete={handleChangeComplete}
                                />
                                : null}
                        </div>
                        <div className="color-subtitle">Second Title
                        <div className="custom-btn color-selector" style={{ backgroundColor: subtitleColor }} onClick={togglesubTitle}>
                            </div>
                            {subtitleColorShow ?
                                <SketchPicker
                                    color={subtitleColor}
                                    onChangeComplete={handleChangeCompletesubTitle}
                                />
                                : null}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Block4