import { HTMLAttributes } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import LoadingIcon from 'src/assets/svg/LoadingIcon';
import { AppState } from 'src/store';

const DefaultLoadingIcon = (props: HTMLAttributes<HTMLDivElement> & PropsFromRedux) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <LoadingIcon fill={props.theme.current.color.ink[30]} style={{ animation: 'spin 2s linear infinite' }} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  theme: state.theme
});
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps);
export default connector(DefaultLoadingIcon);
