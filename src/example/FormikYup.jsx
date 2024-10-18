import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import { Input, Button, Toggle } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as Yup from 'yup';


const FormikYup = () => {

    const registerSchema = Yup.object().shape({
        name: Yup.string().required('Zorunlu Alan'),
        surname: Yup.string().required('Zorunlu Alan'),
        email: Yup.string()
            .required('Zorunlu Alan')
            .email('Lütfen geçerli bir e-mail adresi giriniz.!!'),
        phone: Yup.string()
            .required('Zorunlu Alan')
            .min(11, 'Lütfen minimum 11 hane olarak giriniz.!!')
            .max(13, 'Lütfen maximum 13 hane olarak giriniz.!!'),
        password: Yup.string()
            .required('Zorunlu Alan')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,50}$/,
                'Şartlar sağlanmıyor!!!!',
            ),
        passwordConfirm: Yup.string()
            .required('Zorunlu Alan')
            .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor!'),
        agrementConfirm: Yup.bool()
            .required('Zorunlu Alan')
            .oneOf([true], 'Lütfen sözleşmeyi onaylayınız.'),
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_text}>KAYIT OLUŞTUR</Text>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <ScrollView>
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            surname: '',
                            phone: '',
                            password: '',
                            passwordConfirm: '',
                            agrementConfirm: false,
                        }}
                        validationSchema={registerSchema}
                        onSubmit={values =>
                            Alert.alert('Form Değerleri', JSON.stringify(values, null, 2))
                        }>
                        {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
                            <View>
                                <Input
                                    size="large"
                                    style={{ marginVertical: 10 }}
                                    value={values.name}
                                    label={'İsim:'}
                                    placeholder="İsim giriniz..."
                                    onChangeText={handleChange('name')}
                                    status={errors.name ? 'danger' : 'basic'}
                                    caption={errors.name}
                                />
                                <Input
                                    size="large"
                                    style={{ marginVertical: 10 }}
                                    value={values.surname}
                                    label={'Soyisim:'}
                                    placeholder="Soyisim giriniz..."
                                    onChangeText={handleChange('surname')}
                                    status={errors.surname ? 'danger' : 'basic'}
                                    caption={errors.surname}
                                />
                                <Input
                                    size="large"
                                    style={{ marginVertical: 10 }}
                                    value={values.email}
                                    label={'E-mail:'}
                                    placeholder="E-posta adresi giriniz..."
                                    onChangeText={handleChange('email')}
                                    status={errors.email ? 'danger' : 'basic'}
                                    caption={errors.email}
                                />
                                <Input
                                    size="large"
                                    style={{ marginVertical: 10 }}
                                    value={values.phone}
                                    label={'Tel:'}
                                    placeholder="Telefon numarası giriniz..."
                                    onChangeText={handleChange('phone')}
                                    status={errors.phone ? 'danger' : 'basic'}
                                    caption={errors.phone}
                                />
                                <Input
                                    size="large"
                                    style={{ marginVertical: 10 }}
                                    value={values.password}
                                    label={'Şifre:'}
                                    placeholder="Şifrenizi giriniz..."
                                    onChangeText={handleChange('password')}
                                    status={errors.password ? 'danger' : 'basic'}
                                    caption={errors.password}
                                />
                                <Input
                                    size="large"
                                    style={{ marginVertical: 10 }}
                                    value={values.passwordConfirm}
                                    label={'Şifre Tekrar:'}
                                    placeholder="Şifrenizi tekrar giriniz..."
                                    onChangeText={handleChange('passwordConfirm')}
                                    status={errors.passwordConfirm ? 'danger' : 'basic'}
                                    caption={errors.passwordConfirm}
                                />

                                <View style={{ marginHorizontal: 10 }}>
                                    <Toggle
                                        status='danger'
                                        checked={values.agrementConfirm}
                                        onChange={value => setFieldValue('agrementConfirm', value)}>
                                        Kullanıcı sözleşmesini ve gizlilik anlaşmasını {'\n'}kabul
                                        ediyorum.
                                    </Toggle>
                                    <View style={{ alignItems: 'center', marginTop: 5,fontWeight:'bold' }}>
                                        {errors.agrementConfirm && (
                                            <Text style={{ color: 'red' }}>{errors.agrementConfirm}</Text>
                                        )}
                                    </View>

                                </View>

                                <Button
                                    size="large"
                                    style={{ marginTop: 30 }}
                                    onPress={handleSubmit}
                                    status="danger">
                                    KAYDET
                                </Button>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </View>
        </View>
    )
}

export default FormikYup

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#FF3D71',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: 125,
    },
    header_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },


})