import React from 'react'
import image from './NoteBook.png'
export default function AboutApp() {
    return (
        <div className='container'>
            <div className="jumbotron">
                <h1 className="display-4 text-center">Welcome to NoteBook</h1>
                <img src={image} alt=""/>
                <h1 className="lead my-3"><b>This is a simple and easy to use note taking web application developed using React. Multiple users can use this application to take their notes, easily view them, update them or delete them as per their requirements. 
                It has awesome password protected security features that makes this app super reliable to use.</b></h1>
                <hr className="my-4" />
                <p><i>*It uses utility MERN stack as its tech stack. For client side it uses react v18 and react-router v6. For Backend it uses express v4.18, mongoose v6.10 and MongoDb as its database.</i></p>
            </div>
        </div>
    )
}
