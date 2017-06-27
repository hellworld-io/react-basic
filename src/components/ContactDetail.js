import React, { Component } from 'react';

class ContactDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdid: false,
            name: '',
            phone: ''
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleToggle() {
        if (!this.state.isEdid) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        } else {
            this.handleEdit();
        }
        this.setState({
            isEdid: !this.state.isEdid
        });
    }

    handleChange(e) {
        let changedObj = {};

        changedObj[e.target.name] = e.target.value
        this.setState(changedObj);
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleKeyPress(e) {
        if (e.charCode == 13) {
            this.handleToggle();
        }
    }

    render() {
        const detail = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                </p>
                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        );

        const view = this.state.isEdid ? edit : detail;

        const blank = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const button = (
            <p>
                <button onClick={this.props.onRemove}>Remove</button>
                <button onClick={this.handleToggle}>
                    {this.state.isEdid ? 'Ok' : 'Edit'}
                </button>
            </p>
        );

        return (
            <div>
                <h2>Details Info</h2>
                {this.props.isSelected ? view : blank}
                {this.props.isSelected ? button : ''}
            </div>
        );
    }
}

ContactDetail.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.error("onRemove not defined"); },
    onEdit: () => { console.error("onEdit not defined"); }
};

ContactDetail.propType = {
    contact: React.PropTypes.object,
    onRemove: React.PropTypes.func,
    onEdit: React.PropTypes.func
};

export default ContactDetail;