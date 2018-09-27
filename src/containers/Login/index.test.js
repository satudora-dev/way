import React, { Component } from 'react';
import {firebaseDB,firebaseAuth} from '../../firebase';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import {withRouter} from 'react-router-dom';
import "./login.css";
import { shallow, mount, render } from 'enzyme';
import Login from "./index"
import firebase from "firebase";
import 'firebase/storage';


test('Existance of Github Login', () => {


  // == 準備 ==
  /** Appコンポーネントをshallowレンダリング */
  const wrapper = shallow(<Login />);
  beforeAll(function() {
   firebase.firebase.auth = jest.fn().mockReturnValue({
   currentUser: true,
   signOut: function() { return true; }
   });
 });

  // == 検証 ==
  /** 各コンポーネントの数を取得し、1であればOK */
  expect(wrapper.find(GithubButton).length).toBe(1);
});
