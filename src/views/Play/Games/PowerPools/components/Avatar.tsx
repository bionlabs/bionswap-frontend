import React , {useState , useEffect} from 'react'
import { getMyList } from 'api/avatar';
import { useAccount, useChain, useSingleCallResult } from 'hooks';
import { useAppSelector } from 'state';
import { getUserInfo, updateAvatar } from 'api/user';
import AvatarModal from 'components/AvatarModal';
import { useBionAvatarContract } from 'hooks/useContract';
import {
    Box,
    styled,
    Stack,
    Typography
} from '@mui/material'
import { toastError } from 'hooks/useToast';

const Avatar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const { address } = useAccount();
    const { account } = useChain();
    const [avatars, setAvatars] = useState([]);
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const bionAvatarContract = useBionAvatarContract();
    const claimed = useSingleCallResult(bionAvatarContract, 'claimeds', [account])?.result?.[0] || false;


    const handleToggleModal = () => {
        setOpenModal(!openModal);
    };

    useEffect(() => {
        const getAvatars = async () => {
        try {
            const res = await getMyList(address || '');
            setAvatars(res);
        } catch (error) {
            console.log('error====>', error);
        }
        };

        getAvatars();
    }, [address, claimed, accessToken]);


        useEffect(() => {
            const getUserInformation = async () => {
            try {
                if (!accessToken) return;

                const rest = await getUserInfo();
                setUserInfo(rest);
            } catch (error) {
                console.log('error====>', error);
            }
            };

            getUserInformation();
        }, [address, accessToken, account, openModal]);

        const handleUpdateAvatar = async (param: string) => {
            try {
            const res = await updateAvatar(param);
            setOpenModal(false);
            } catch (error) {
                console.log('error====>', error);
            }
        };
  return (
    <>
        <AvatarBox
            onClick={handleToggleModal}
            >
            <img
                src={
                userInfo?.avatar?.imageURL
                    ? `/images/bitendoGameboy/${userInfo?.avatar?.typeId}.svg`
                    : '/images/bitendoGameboy/Default.svg'
                }
                alt=""
                width="53px"
                height="53px"
            />
        </AvatarBox>
        <AvatarModal
            open={openModal}
            onDismiss={handleToggleModal}
            avatars={avatars}
            handleChooseAvatar={handleUpdateAvatar}
        />
    </>
  )
}

const AvatarBox = styled(Box)`
  * {
    transition: 0.12s ease-in;
  }
  position: relative;
  cursor: pointer;
  :hover {
    img {
      opacity: 0.3;
    }
  }

  img {
    object-fit: cover;
  }
`;

export default Avatar