import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { MapPin, Calendar, Package } from 'lucide-react-native';
import { useProducts } from '@/contexts/ProductContext';
import Colors from '@/constants/colors';
import { CATEGORIES } from '@/constants/categories';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { products } = useProducts();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Producto no encontrado' }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Producto no encontrado</Text>
        </View>
      </View>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.category);
  const conditionLabels = {
    'new': 'Nuevo',
    'like-new': 'Como nuevo',
    'good': 'Buen estado',
    'fair': 'Estado aceptable',
    'poor': 'Necesita reparación',
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: Colors.card,
        }}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageCarousel}
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.productImage}
            />
          ))}
        </ScrollView>

        <View style={styles.content}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryEmoji}>{category?.emoji}</Text>
            <Text style={styles.categoryName}>{category?.name}</Text>
          </View>

          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>€{product.price.toLocaleString()}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Package size={18} color={Colors.textSecondary} />
              <Text style={styles.infoText}>{conditionLabels[product.condition]}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={18} color={Colors.textSecondary} />
              <Text style={styles.infoText}>
                {new Date(product.createdAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                })}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ubicación</Text>
            <View style={styles.locationContainer}>
              <MapPin size={20} color={Colors.primary} />
              <Text style={styles.locationText}>{product.location}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vendedor</Text>
            <View style={styles.sellerContainer}>
              <Image
                source={{ uri: product.seller.avatar }}
                style={styles.sellerAvatar}
              />
              <View style={styles.sellerInfo}>
                <Text style={styles.sellerName}>{product.seller.name}</Text>
                <Text style={styles.sellerLabel}>Vendedor particular</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton} activeOpacity={0.8}>
          <Text style={styles.contactButtonText}>Contactar vendedor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  imageCarousel: {
    height: 400,
  },
  productImage: {
    width: width,
    height: 400,
    backgroundColor: Colors.border,
  },
  content: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  title: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 32,
  },
  price: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: Colors.primary,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '600' as const,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  sellerLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footer: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  contactButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.card,
  },
});
