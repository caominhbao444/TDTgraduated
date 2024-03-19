import { useEffect, useState } from "react";
import LoginImg from "../../assets/login.png";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Dialog,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Typography,
    CircularProgress,
    DialogTitle,
    ListItemIcon,
  } from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from "moment";
import { useSelector } from "react-redux";
// import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
// import { Image } from '@ckeditor/ckeditor5-image';

const Blog = () => {
    const [blogs, setBlogs] = useState()
    const [editBlog, setEditBlog] = useState()
    const [content, setContent] = useState();
    const [openEditBlog, setOpenEditBlog] = useState(false)
    const [isEdit, setIsEdit] = useState(false);

    const userDetail = useSelector((state) => state.user.userDetail);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + `/blogs`, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setBlogs(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    const handleCloseEdit = () => {
        setOpenEditBlog(false)
    }
    const createBlog = () => {
        console.log(userDetail)
        // if(content && userDetail){
            axios.post(import.meta.env.VITE_APP_BASE_URL + `/blogs`,{
                content: content,
                author: userDetail.id
            }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setBlogs(res.data)
            }).catch((error) => {
                console.log(error)
            })
        // }
    }
    const EditBlog = () => {
        axios.put(import.meta.env.VITE_APP_BASE_URL + `/blogs/${editBlog.id}`, {
            content: content,
          },{
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setBlogs(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    const deleteBlog = (id) => {
        axios.delete(import.meta.env.VITE_APP_BASE_URL + `/blogs/${id}`, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setBlogs(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleOpenEditBlog = (blog) => {
        console.log(blog)
        setOpenEditBlog(true);
        setContent(blog.content);
        setEditBlog(blog)
      };
    const formatTime = (time) => {
        const translations = {
          years: "năm",
          months: "tháng",
          weeks: "tuần",
          days: "ngày",
          hours: "giờ",
          minutes: "phút",
          seconds: "giây",
          milliseconds: "mili giây",
          ago: "trước",
          an: "Một",
          a: "Một",
          day: "ngày",
          hour: "giờ",
          few: "vài",
          minute: "phút",
        };
        const vietnameseTimeIntervalString = time.replace(
          /\b\w+\b/g,
          (match) => translations[match] || match
        );
        return vietnameseTimeIntervalString;
    };
    // const uploadAdapter = (loader) => {
    //     return {
    //         upload: () => {
    //             return new Promise((resolve, reject) => {
    //                 const body = new FormData();
    //                 loader.file.then((file) => {
    //                     body.append("files", file)
    //                     axios.post(import.meta.env.VITE_APP_BASE_URL + '/upload', {
    //                         body
    //                     }).then((res) => {
    //                         console.log(res)
    //                         resolve({default: import.meta.env.VITE_APP_BASE_URL + `/${res.data.url}`})
    //                     }).catch((error) => {
    //                         reject(error)
    //                     })
    //                 })
    //             })
    //         }
    //     }
    // }
    // const uploadPlugin = (editor) => {
    //     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    //         return uploadAdapter(loader)
    //     }
    // }
    if(!blogs) {
        return null
    }
  return (
    <>
        <div className="mt-28 h-screen w-full mb-24">
            <h1 className="text-center">BLOGS</h1>
            <div className="m-24 border-solid border-2 border-gray-500">
                <CKEditor
                    // config={{
                    //     extraPlugins: [uploadPlugin]
                    // }}
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        setContent(editor.getData())
                        console.log( editor.getData() );
                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
                <div className="flex justify-end">
                    <button className="rounded-md border-solid border-1 border-gray-500 bg-cyan-600 p-2 px-3" onClick={() => createBlog()}>Tạo</button>
                </div>
            </div>
            {
                blogs ? blogs.map((bl) => {
                    return (
                        <>
                            <Card className="mx-96 mb-4 border-solid border-1 border-gray-500" key={bl.id}>
                                <CardHeader
                                avatar={
                                    bl ? (
                                    <Skeleton
                                        animation="wave"
                                        variant="circular"
                                        width={40}
                                        height={40}
                                    />
                                    ) : (
                                        <>
                                            <Avatar
                                            alt="Ted talk"
                                            src={bl.author.image ? bl.author.image : ""}
                                            />
                                            <MoreVertOutlinedIcon className="text-white cursor-pointer rounded-[100%]" />
                                        </>
                                    )
                                }
                                action={
                                    <>
                                        {userDetail.id === bl.author.id && (
                                            <IconButton
                                                aria-label="settings"
                                                className="relative"
                                                onClick={() => setIsEdit(!isEdit)}
                                            >
                                                <MoreVertOutlinedIcon />
                                                {isEdit && (
                                                <div className="absolute top-[110%] right-0 text-center w-[100px] border bg-white border-textLightColor flex flex-col">
                                                    <div
                                                    className="w-full py-2 text-[14px]"
                                                    onClick={() => handleOpenEditBlog(bl)}
                                                    >
                                                    Chỉnh sửa
                                                    </div>
                                                    <Divider />
                                                    <div
                                                        onClick={() => deleteBlog(bl.id)}
                                                        className="w-full py-2 text-[14px]"
                                                    >Xóa</div>
                                                </div>
                                                )}
                                            </IconButton>
                                        )}
                                    </>
                                }
                                title={bl.author.fullname}
                                subheader={`${formatTime(
                                    moment(bl.createdAt).locale("vi").fromNow()
                                )}`}
                                />
                                <CardContent>
                                <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: bl.content }}>
                                    {/* {bl.content} */}
                                </Typography>
                                </CardContent>
                                <div className="px-4 flex justify-between items-center w-full">
                                {/* <div className="flex items-center gap-1">
                                    <ThumbUpIcon
                                    className={
                                        props.post.liked.filter((el) => el.id == userDetail.id).length >
                                        0
                                        ? "text-mainColor"
                                        : "text-gray-200"
                                    }
                                    />
                                    <AvatarGroup
                                    componentsProps={{
                                        additionalAvatar: {
                                        sx: {
                                            height: 20,
                                            width: 20,
                                            background: "red",
                                            fontSize: 10,
                                            marginLeft: 20,
                                        },
                                        },
                                    }}
                                    spacing={"medium"}
                                    max={2}
                                    >
                                    {props.post.liked
                                        ? props.post.liked.map((el) => (
                                            <Avatar
                                            key={el.id}
                                            sx={{ width: 20, height: 20, fontSize: 10 }}
                                            alt="Remy Sharp"
                                            src={el.image}
                                            />
                                        ))
                                        : null}
                                    </AvatarGroup>
                                </div> */}
                                {/* <div className="flex items-center">
                                    <span>{props.post.comments.length}</span>
                                    <span className="ml-1">Bình luận</span>
                                </div> */}
                                </div>

                                {/* <CardActions className="flex justify-between w-full p-0 border mt-4">
                                <button
                                    className="w-1/2 flex justify-center items-center gap-3 md:py-1"
                                    onClick={() => onLiked(blogs.id)}
                                >
                                    <ThumbUpIcon
                                    className={
                                        blogs.liked.filter((el) => el.id == userDetail.id).length >
                                        0
                                        ? "text-mainColor"
                                        : "text-gray-200 "
                                    }
                                    fontSize="small"
                                    />
                                    <span className="font-medium text-[12px] md:text-[15px]">
                                    Thích
                                    </span>
                                </button>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <button
                                    className="w-1/2 flex justify-center items-center gap-3 md:py-1"
                                    onClick={handleExpandClick}
                                >
                                    <ModeCommentIcon
                                    className="text-textLightColor "
                                    fontSize="small"
                                    />
                                    <span className="font-medium text-[12px] md:text-[15px]">
                                    Bình luận
                                    </span>
                                </button>
                                </CardActions> */}
                                {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                                {props.post.comments &&
                                    props.post.comments
                                    .filter((el) => !el.comment)
                                    .map((comment, index) => {
                                        return (
                                        <>
                                            <Comment
                                            key={`${comment.id}_${index}`}
                                            name={comment.name}
                                            content={comment.content}
                                            dateCreate={comment.dateCreate}
                                            id={comment.id}
                                            comment={comment}
                                            authorPost={props.post.author.id}
                                            />
                                        </>
                                        );
                                    })}
                                <CardContent>
                                    <div className="flex gap-4 w-full">
                                    <Avatar alt="Remy Sharp" src={userDetail.image} />
                                    <div className="flex flex-col w-full gap-2">
                                        <Textarea
                                        placeholder="Viết bình luận…"
                                        minRows={1}
                                        className="outline-none text-justify"
                                        variant="soft"
                                        value={textComment}
                                        onChange={(e) => setTextComment(e.target.value)}
                                        endDecorator={
                                            <Box
                                            sx={{
                                                display: "flex",
                                                gap: "var(--Textarea-paddingBlock)",
                                                pt: "var(--Textarea-paddingBlock)",
                                                borderTop: "1px solid",
                                                borderColor: "divider",
                                                flex: "auto",
                                            }}
                                            >
                                            <Button onClick={() => setOpen(!open)}>
                                                <MoodIcon />
                                            </Button>
                                            <Button
                                                sx={{ ml: "auto" }}
                                                onClick={() => handleComment()}
                                            >
                                                <SendIcon />
                                            </Button>
                                            </Box>
                                        }
                                        />
                                    </div>
                                    </div>
                                </CardContent>
                                </Collapse> */}
                            </Card>
                        </>
                    )
                }) : null
            }
        </div>
        <Dialog open={openEditBlog} onClose={handleCloseEdit}>
            <DialogTitle style={{ backgroundColor: "#1877f2" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <span style={{ fontWeight: "bold", color: "white" }}>
                Sửa bài viết
                </span>
                <CloseOutlinedIcon
                name="close-circle-outline"
                onClick={handleCloseEdit}
                className="w-[30px] h-[30px] block cursor-pointer border-none z-10 text-white"
                />
            </Box>
            </DialogTitle>
            <div className="flex flex-col md:justify-around relative p-[20px] max-w-[600px] md:h-[400px] gap-[10px]">
            <Box
                maxWidth="600px"
                className="flex flex-col md:flex-row gap-[10px] relative"
            >
                <div className="h-full w-full">
                    <h2>Edit Blog</h2>
                    <CKEditor
                        // config={{
                        //     extraPlugins: [uploadPlugin]
                        // }}
                        editor={ ClassicEditor }
                        data={content}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            setContent(editor.getData())
                            console.log( editor.getData() );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
            </Box>
            <Button
                onClick={() => EditBlog()}
                variant="contained"
                style={{
                backgroundColor: "#1877f2",
                borderRadius: "0",
                fontWeight: "bold",
                }}
                fullWidth
            >
                Sửa bài
            </Button>
            </div>
        </Dialog>
    </>
    
  );
};

export default Blog;
