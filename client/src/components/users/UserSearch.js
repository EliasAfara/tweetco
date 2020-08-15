import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSearch, clear } from '../../actions/users';
import PropTypes from 'prop-types';

const UserSearch = ({ user, toggleSearch, clear }) => {
  return (
    <Link
      to={{ pathname: '/user', state: { user: user, prev: '/home' } }}
      className='flex bg-white rounded-lg p-6 transition duration-300 ease-in-out hover:bg-gray-200 border-b border-gray-200'
      onClick={() => {
        toggleSearch(false);
        clear();
      }}
    >
      <img
        className='h-12 w-12 sm:h-24 sm:w-24 rounded-full mx-0 mr-6'
        src={
          user.profileImage !==
          'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
            ? user.profileImage
            : 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
        }
        alt='1'
      />
      <div className='text-left'>
        <h2 className='text-sm sm:text-lg'>{user.name}</h2>
        <div className='text-gray-500'>@{user.username}</div>
        <div className='text-sm sm:text-lg text-gray-600'>{user.bio}</div>
      </div>
    </Link>
  );
};

UserSearch.propTypes = {
  toggleSearch: PropTypes.func,
  clear: PropTypes.func,
};
export default connect(null, { toggleSearch, clear })(UserSearch);
