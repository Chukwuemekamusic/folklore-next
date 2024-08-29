import { Rate } from 'antd';
interface StarRateProps {
    value: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
}

export const StarRate: React.FC<StarRateProps> = ({ value, onChange, disabled }) => {
    return <Rate defaultValue={value} onChange={onChange} disabled={disabled} allowHalf={true}/>;
};