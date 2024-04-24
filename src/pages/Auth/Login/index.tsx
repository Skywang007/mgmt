import logo from '@/assets/parsec-logo.svg';
import { TOKEN } from '@/constants';
import { authLogin } from '@/services';
import storage from '@/utils/storage';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Link, useModel } from '@umijs/max';
import { useTitle } from 'ahooks';
import { Tabs, message, theme } from 'antd';
import NProgress from 'nprogress';

import { useState } from 'react';

type LoginType = 'phone' | 'account';

export default () => {
  useTitle('化橘红产业数据分析后台管理-登录');
  const { initialState, setInitialState } = useModel('@@initialState');
  // const { loading, data, refresh } = useRequest<API.AuthCodeVo, any>(
  //   getPublicAuthCode,
  //   {
  //     refreshOnWindowFocus: true,
  //     onFinally: () => NProgress.done(),
  //   },
  // );
  console.log('initialState', initialState);

  const [loginType, setLoginType] = useState<LoginType>('phone');
  const { token } = theme.useToken();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleLogin = async (formData: any) => {
    const loginRes = await authLogin({
      ...formData,
      loginType,
    }).catch(() => {
      // refresh(); // 刷新图片验证码
    });
    const { message: messages, state, token = '' } = loginRes;
    if (state == 200) {
      storage.set(TOKEN, token);
      message.success(messages);
      window.location.replace('/');
      NProgress.done()
      // await fetchUserInfo();
      // const urlParams = new URL(window.location.href).searchParams;
      // if (
      //   !!urlParams.get('redirect') &&
      //   !urlParams.get('redirect')?.endsWith('/login')
      // ) {
      //   window.location.replace(urlParams.get('redirect') || '');
      // } else {
      //   window.location.replace('/');
      // }
    } else if (state == 201 || state == 202) {
      message.error(messages || '登录失败！');
    }

    //
    // // return;
    // if (loginRes) {
    //   if (loginRes?.code === 0) {
    //     storage.set(TOKEN, loginRes?.data || '');
    //     message.success('登录成功！');
    //     await fetchUserInfo();
    //     const urlParams = new URL(window.location.href).searchParams;
    //     if (
    //       !!urlParams.get('redirect') &&
    //       !urlParams.get('redirect')?.endsWith('/login')
    //     ) {
    //       window.location.replace(urlParams.get('redirect') || '');
    //     } else {
    //       window.location.replace('/');
    //     }
    //   } else {
    //
    //   }
    // }
    return;
  };
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <LoginFormPage
        backgroundImageUrl={
          'https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'
        }
        logo={logo}
        title={(<span>HI~</span>) as any}
        subTitle="欢迎使用化橘红产业数据分析后台管理"
        onFinish={handleLogin}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
                strengthText:
                  'Password should contain numbers, letters and special characters, at least 8 characters long.',
                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return 'ok';
                    }
                    if (value && value.length > 6) {
                      return 'pass';
                    }
                    return 'poor';
                  };
                  const status = getStatus();
                  if (status === 'pass') {
                    return (
                      <div style={{ color: token.colorWarning }}>强度：中</div>
                    );
                  }
                  if (status === 'ok') {
                    return (
                      <div style={{ color: token.colorSuccess }}>强度：强</div>
                    );
                  }
                  return (
                    <div style={{ color: token.colorError }}>强度：弱</div>
                  );
                },
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="phoneNumber"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <Link
            to={'/auth/forget-password'}
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </Link>
        </div>
      </LoginFormPage>
    </div>
  );
};
