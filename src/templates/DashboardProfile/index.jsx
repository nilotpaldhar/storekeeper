import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectUserAuthStatus, selectUserAbout } from '@store/slices/user/user.selectors';

import Alert from '@ui/feedback/Alert';
import LoadingUI from '@ui/feedback/LoadingUI';
import DashboardMHeader from '@ui/dashboard/DashboardMHeader';

import InfoForm from './InfoForm';
import EmailForm from './EmailForm';

/**
 * Render the DashboardProfileTmpl component.
 *
 * @return {Element} The DashboardProfileTmpl component.
 */
const DashboardProfileTmpl = () => {
	const { update } = useSession();
	const [errMsg, setErrMsg] = useState('');

	const authStatus = useSelector(selectUserAuthStatus);
	const user = useSelector(selectUserAbout);

	return (
		<>
			<DashboardMHeader href="/dashboard">Edit Profile</DashboardMHeader>
			<LoadingUI loading={authStatus === 'loading' || !user} height={370}>
				{errMsg && (
					<Alert type="error" className="mb-6">
						{errMsg}
					</Alert>
				)}

				<div className="flex flex-col space-y-12">
					<InfoForm
						firstname={user?.firstname}
						lastname={user?.lastname}
						phone={user?.phone}
						onInit={() => setErrMsg('')}
						onSuccess={(data) => update(data?.user)}
						onFail={(data) => setErrMsg(data?.message)}
					/>
					<EmailForm
						email={user?.email}
						onInit={() => setErrMsg('')}
						onSuccess={(data) => update(data?.user)}
						onFail={(data) => setErrMsg(data?.message)}
					/>
				</div>
			</LoadingUI>
		</>
	);
};

export default DashboardProfileTmpl;
