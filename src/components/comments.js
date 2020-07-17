import React from 'react'

export default class Comments extends React.Component{

    render(){
        const a = this.props.comm
        console.log(a)
        return(
            <div>
                {/* <p>{this.props.comm.text}</p> */}
            </div>
        );
    }
}