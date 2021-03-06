import React, { useState } from 'react';
import { Link as RouterLink, withRouter, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField,
	Modal
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ComponentService from '../ComponentService'
import Cookies from 'js-cookie'

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {},
	btn: {
		background: '#5E9A78',
		color: '#FFFFFF',
		marginTop: '10px'
	},
	paper: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: 'none',
		padding: theme.spacing(2, 4, 3),
	},
	success: {
		fontSize: '80px',
		margin: '0 0 20px'
	}
}));

const PengadaanForm = props => {
	const history = useHistory();
	const { className, ...rest } = props;

	const [values, setValues] = useState({});
	const [openModal, setOpenModal] = useState(false)
	const [modalStyle] = useState(getModalStyle);

	const classes = useStyles();

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();

		const pengadaan = { ...values, 'uuid_user': JSON.parse(Cookies.get('user')).uuid }

		ComponentService.insertPengadaan(pengadaan).then(response => setOpenModal(true))
	}

	const handleClose = () => {
		setOpenModal(false)
	}

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<CheckCircleOutlineIcon style={{ color: '#6C987B' }} id="modal-logo" className={classes.success} />
			<p id="modal-description">
				Data pengadaan berhasil ditambahkan
			</p>
			<RouterLink to='/pengadaan'>
				<Button
					className={classes.btn}
					variant="contained"
				>
					Oke
					</Button>
			</RouterLink>
		</div>
	)

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="modal-logo"
				aria-describedby="modal-description"
			>
				{body}
			</Modal>
			<form
				autoComplete="off"
				noValidate
			>
				<CardHeader
					title="Tambah Data Pengadaan"
				/>
				<Divider />
				<CardContent>
					<Grid
						container
						spacing={3}
					>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Judul Buku"
								margin="dense"
								name="judul"
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Nama Pengarang"
								margin="dense"
								name="pengarang"
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Nama Penerbit"
								margin="dense"
								name="penerbit"
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Jumlah"
								margin="dense"
								name="jumlah"
								onChange={handleChange}
								required
								type="number"
								variant="outlined"
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Harga"
								margin="dense"
								name="harga"
								onChange={handleChange}
								required
								type="number"
								variant="outlined"
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardActions>
					<Button
						className={classes.btn}
						variant="contained"
						onClick={handleSubmit}
					>
						SIMPAN
          			</Button>
				</CardActions>
			</form>
		</Card>
	);
};

PengadaanForm.propTypes = {
	className: PropTypes.string
};

export default PengadaanForm;