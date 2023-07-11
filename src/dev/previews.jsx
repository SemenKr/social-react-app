import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import MyPosts from "../components/Profile/MyPosts/MyPosts";
import {Textarea} from "../components/ui/Form-controls";
import ProfileContainer from "../components/Profile/ProfileContainer";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/MyPosts">
                <MyPosts/>
            </ComponentPreview>
            <ComponentPreview path="/Textarea">
                <Textarea/>
            </ComponentPreview>
            <ComponentPreview path="/ProfileContainer">
                <ProfileContainer/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
