import React from "react";
import { Box, Typography, styled, FormControl, OutlinedInput, Button } from "@mui/material";
import { setPresaleForm } from "state/presale/action";

const Step01 = ({ data, setData, handleNext, onShowError, communities, setCommunities }: any) => {

    const handleChange = (prop: any) => (event: any) => {
        setData(setPresaleForm({ ...data, [prop]: event.target.value }))
    }

    const handleChangeCommunities = (prop: any) => (event: any) => {
        setCommunities({ ...communities, [prop]: event.target.value })
    }

    return (
        <FlexBox flexDirection='column' gap='46px' pt="40px" pb="40px">
            <FlexBox flexDirection='column' alignItems='center'>
                <Typography variant="h3" color="text.primary" fontWeight="400">
                    1. Start with the basics
                </Typography>
                <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                    Make it easy for people to learn about your project.
                </Typography>
            </FlexBox>
            <FlexBox flexDirection="column">
                <WrapLine>
                    <WrapDescription>
                        <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                            Project title
                        </Typography>
                        <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                            Write a clear, brief title to help people quickly understand your project. Both will appear on your project and pre-launch pages.
                        </Typography>
                    </WrapDescription>
                    <WrapValue>
                        <WrapForm fullWidth>
                            <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                Title <RequireSymbol component='span'>*</RequireSymbol>
                            </Typography>
                            <InputCustom placeholder="Enter project title"
                                className={onShowError('projectTitle') ? 'onError' : ''}
                                value={data.projectTitle}
                                onChange={handleChange('projectTitle')}
                                fullWidth />
                            <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                {onShowError('projectTitle')}
                            </Typography>
                        </WrapForm>
                    </WrapValue>
                </WrapLine>
                <WrapLine>
                    <WrapDescription>
                        <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                            Project logo
                        </Typography>
                        <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                            Make it easy for people to learn about your project.
                        </Typography>
                    </WrapDescription>
                    <WrapValue>
                        <WrapForm fullWidth>
                            <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                URL image <RequireSymbol component='span'>*</RequireSymbol>
                            </Typography>
                            <InputCustom fullWidth
                                className={onShowError('projectLogo') ? 'onError' : ''}
                                placeholder="Enter url image"
                                value={data.projectLogo}
                                onChange={handleChange('projectLogo')} />
                            <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                {onShowError('projectLogo')}
                            </Typography>
                        </WrapForm>
                    </WrapValue>
                </WrapLine>
                <WrapLine>
                    <WrapDescription>
                        <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                            Sale banner
                        </Typography>
                        <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                            Make it easy for people to learn about your project.
                        </Typography>
                    </WrapDescription>
                    <WrapValue>
                        <WrapForm fullWidth>
                            <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                URL image <RequireSymbol component='span'>*</RequireSymbol>
                            </Typography>
                            <InputCustom fullWidth
                                className={onShowError('saleBanner') ? 'onError' : ''}
                                placeholder="Enter url image"
                                value={data.saleBanner}
                                onChange={handleChange('saleBanner')} />
                            <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                {onShowError('saleBanner')}
                            </Typography>
                        </WrapForm>
                    </WrapValue>
                </WrapLine>
                <WrapLine >
                    <WrapDescription>
                        <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                            Video promo (optional)
                        </Typography>
                        <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                            Add a video that describes your project.
                            <br />
                            <br />
                            Tell people what you’re raising funds to do, how you plan to make it happen, who you are, and why you care about this project.
                            <br />
                            <br />
                            After you’ve uploaded your video, use our editor to add captions and subtitles so your project is more accessible to everyone.
                        </Typography>
                    </WrapDescription>
                    <WrapValue>
                        <WrapForm fullWidth>
                            <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                URL image
                            </Typography>
                            <InputCustom fullWidth
                                placeholder="Enter url image"
                                value={data.videoPromo}
                                onChange={handleChange('videoPromo')} />
                        </WrapForm>
                    </WrapValue>
                </WrapLine>
                <WrapLine sx={{
                    borderBottom: '1px solid',
                    borderColor: 'gray.600',
                }}>
                    <WrapDescription>
                        <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                            Community
                        </Typography>
                        <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                            Make it easy for people to learn about your project.
                        </Typography>
                    </WrapDescription>
                    <WrapValue>
                        <WrapForm fullWidth>
                            <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                Website <RequireSymbol component='span'>*</RequireSymbol>
                            </Typography>
                            <InputCustom fullWidth
                                className={onShowError('website') ? 'onError' : ''}
                                placeholder="Enter your website"
                                value={communities.website}
                                onChange={handleChangeCommunities('website')} />
                            <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                {onShowError('website')}
                            </Typography>
                        </WrapForm>
                        <WrapForm fullWidth>
                            <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                Telegram <RequireSymbol component='span'>*</RequireSymbol>
                            </Typography>
                            <InputCustom fullWidth
                                className={onShowError('telegram') ? 'onError' : ''}
                                placeholder="Enter your telegram"
                                value={communities.telegram}
                                onChange={handleChangeCommunities('telegram')} />
                            <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                {onShowError('telegram')}
                            </Typography>
                        </WrapForm>
                        <WrapForm fullWidth>
                            <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                Discord <RequireSymbol component='span'>*</RequireSymbol>
                            </Typography>
                            <InputCustom fullWidth
                                className={onShowError('discord') ? 'onError' : ''}
                                placeholder="Enter your discord"
                                value={communities.discord}
                                onChange={handleChangeCommunities('discord')} />
                            <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                {onShowError('discord')}
                            </Typography>
                        </WrapForm>
                    </WrapValue>
                </WrapLine>
            </FlexBox>
            <FlexBox justifyContent='flex-end'>
                <Next onClick={() => handleNext(1)}>
                    <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                        Next
                    </Typography>
                </Next>
            </FlexBox>
        </FlexBox>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const WrapLine = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 30px 0;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.palette.gray[600]};
`
const WrapDescription = styled(Box)`
    display: flex;
    flex-direction: column;
    max-width: 328px;
    width: 100%;
`
const WrapValue = styled(Box)`
    max-width: 617px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`
const Next = styled(Button)`
    max-width: 200px;
    width: 100%;
    height: 45px;
    align-item: center;
    justify-content: center;
    display: flex;
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 4px;
`
const WrapForm = styled(FormControl)`
    display: flex;
    flex-direction: column;
    gap: 6px;
`
const InputCustom = styled(OutlinedInput)`
    fieldset {
        display: none
    }

    input {
        font-family: 'Poppins', sans-serif;
        padding: 12px 16px;
        border: 1px solid;
        border-color: ${(props) => props.theme.palette.gray[700]};
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        line-height: 180%;
        color: ${(props) => props.theme.palette.text.primary};

        &::placeholder {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 180%;
            color: ${(props) => props.theme.palette.gray[700]};
            opacity: 1;
        }
    }

    &.Mui-focused {
        input {
            border-color: #9A6AFF;
            box-shadow: rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
        }
    }

    &.onError {
        input {
            border-color: ${(props) => props.theme.palette.red[500]};
            box-shadow: none;
        }
    }
`
const RequireSymbol = styled(Box)`
    color: ${(props) => props.theme.palette.red[500]};
`

export default Step01