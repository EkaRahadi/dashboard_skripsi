import Card from '@material-tailwind/react/Card';
import Image from '@material-tailwind/react/Image';
import H5 from '@material-tailwind/react/Heading5';
import Icon from '@material-tailwind/react/Icon';
import ProfilePicture from 'assets/img/team-1-800x800.jpg';

export default function ProfileCard() {
    return (
        <Card>
            <div className="flex flex-wrap justify-center">
                <div className="w-48 px-4 -mt-24">
                    <Image src={ProfilePicture} rounded raised />
                </div>
            </div>
            <div className="text-center mt-2">
                <H5 color="gray">Eka Rahadi</H5>
                <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                    <Icon name="mail" size="xl" />
                    ekarahadi98@gmail.com
                </div>
                {/* <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                    <Icon name="work" size="xl" />
                    Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                    <Icon name="account_balance" size="xl" />
                    University of Computer Science
                </div> */}
            </div>
        </Card>
    );
}
