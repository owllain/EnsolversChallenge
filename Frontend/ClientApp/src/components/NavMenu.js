import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 bg-pan-left" container light>
                    <NavbarBrand tag={Link} to="/">EnsolversChallenge</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-pastel" to="/">Home</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-pastel" to="/add-note">New Note</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-pastel" to="/my-notes">My Notes</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-pastel" to="/active-notes">Actives</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-pastel" to="/archived-notes">Archived</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
