import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
	root: {},
	row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: theme.spacing(1)
	},
	spacer: {
		flexGrow: 1
	},
	importButton: {
		marginRight: theme.spacing(1)
	},
	exportButton: {
		marginRight: theme.spacing(1)
	},
	btn: {
		background: "#6C987B",
		color: "#FFFFFF"
	}
}));

const PenggunaToolbar = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}
		>
			<div className={classes.row}>
				<RouterLink to='/users'>
					<Button
						variant="contained"
						className={classes.btn}
					>
						Kembali
        			</Button>
				</RouterLink>
			</div>
		</div>
	);
};

PenggunaToolbar.propTypes = {
	className: PropTypes.string
};

export default PenggunaToolbar;
