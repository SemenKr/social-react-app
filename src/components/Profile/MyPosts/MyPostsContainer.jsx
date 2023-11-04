import MyPosts from "./MyPosts";
import {actions} from "../../Redux/profile-reducer.ts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (text) => {
            dispatch(actions.addPostActionCreator(text))
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;
