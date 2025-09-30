import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ImagePlus, X } from 'lucide-react-native';
import { useProducts } from '@/contexts/ProductContext';
import { useUser } from '@/contexts/UserContext';
import { CATEGORIES } from '@/constants/categories';
import Colors from '@/constants/colors';
import { Category } from '@/types/product';

export default function AddProductScreen() {
  const router = useRouter();
  const { addProduct } = useProducts();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [category, setCategory] = useState<Category>('other');
  const [condition, setCondition] = useState<'new' | 'like-new' | 'good' | 'fair' | 'poor'>('good');
  const [imageUri, setImageUri] = useState<string>('');

  const conditionOptions: { value: 'new' | 'like-new' | 'good' | 'fair' | 'poor'; label: string }[] = [
    { value: 'new', label: 'Nuevo' },
    { value: 'like-new', label: 'Como nuevo' },
    { value: 'good', label: 'Buen estado' },
    { value: 'fair', label: 'Estado aceptable' },
    { value: 'poor', label: 'Necesita reparación' },
  ];

  const { profile } = useUser();

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          'Permiso requerido',
          'Necesitamos acceso a tu galería para seleccionar una imagen.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const removeImage = () => {
    setImageUri('');
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !price.trim() || !location.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert('Error', 'Por favor ingresa un precio válido');
      return;
    }

    const defaultImages = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    ];

    addProduct({
      title: title.trim(),
      description: description.trim(),
      price: priceNumber,
      category,
      images: imageUri ? [imageUri] : defaultImages,
      location: location.trim(),
      seller: {
        name: profile.name || 'Usuario',
        avatar: profile.photo || 'https://i.pravatar.cc/150?img=1',
      },
      condition,
    });

    Alert.alert('¡Éxito!', 'Tu producto ha sido publicado', [
      {
        text: 'OK',
        onPress: () => {
          setTitle('');
          setDescription('');
          setPrice('');
          setLocation('');
          setCategory('other');
          setCondition('good');
          setImageUri('');
          router.push('/');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Publicar producto</Text>
        <Text style={styles.headerSubtitle}>Completa la información de tu artículo</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: iPhone 13 Pro Max"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={Colors.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe tu producto en detalle..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={Colors.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Precio (€) *</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholderTextColor={Colors.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ubicación *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Madrid, España"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor={Colors.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Imagen del producto</Text>
            {imageUri ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={removeImage}
                >
                  <X color="#fff" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <ImagePlus color={Colors.textLight} size={48} />
                <Text style={styles.imagePickerText}>Toca para seleccionar imagen</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.hint}>Si no agregas una imagen, se usará una por defecto</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoría</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.optionsScroll}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.optionChip,
                    category === cat.id && styles.optionChipActive,
                  ]}
                  onPress={() => setCategory(cat.id)}
                >
                  <Text style={styles.optionEmoji}>{cat.emoji}</Text>
                  <Text style={[
                    styles.optionText,
                    category === cat.id && styles.optionTextActive,
                  ]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.conditionGrid}>
              {conditionOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.conditionOption,
                    condition === opt.value && styles.conditionOptionActive,
                  ]}
                  onPress={() => setCondition(opt.value)}
                >
                  <Text style={[
                    styles.conditionText,
                    condition === opt.value && styles.conditionTextActive,
                  ]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Publicar producto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.card,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  hint: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 6,
  },
  optionsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  optionChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  optionTextActive: {
    color: Colors.card,
  },
  conditionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  conditionOptionActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  conditionText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  conditionTextActive: {
    color: Colors.card,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.card,
  },
  imagePicker: {
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed' as const,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  imagePickerText: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600' as const,
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
