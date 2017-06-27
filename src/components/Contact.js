import React, { Component } from 'react';
import ContactInfo from './ContactInfo';
import ContactDetail from './ContactDetail';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentWillMount() {
        const storageData = localStorage.contactData;

        if (storageData) {
            this.setState({
                contactData: JSON.parse(storageData)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        });
    }

    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] }),
            selectedKey: -1
        });
    }

    handleRemove() {
        if (this.state.selectedKey < 0) return;

        this.setState({
            contactData: update(
                this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]] }
            )
        });
    }

    handleEdit(editedName, editedPhone) {
        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: editedName },
                        phone: { $set: editedPhone }
                    }
                }
            )
        });
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
                }
            );
            return data.map((contact, i) => {
                return (<ContactInfo
                    contact={contact}
                    key={i}
                    onClick={() => this.handleClick(i)}
                />);
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetail
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                />

                <ContactCreate onCreate={this.handleCreate} />
            </div>
        );
    }
}

export default Contact;