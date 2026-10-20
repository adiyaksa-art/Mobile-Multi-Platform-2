import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryCard({
  title, date, preview, moodUri, onPress, variant = 'list', moodType 
}) {
  
  // Fungsi penentu warna border badge berdasarkan mood
  const getBadgeColor = () => {
    switch (moodType) {
      case 'happy': return '#4ade80';
      case 'focus': return '#3b82f6';
      case 'calm': return '#a78bfa';
      case 'tired': return '#9ca3af';
      case 'joy': return '#facc15';
      default: return COLORS.border;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#e5e7eb' }}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      accessible
      accessibilityLabel={`Entri ${title} tanggal ${date}`}
    >
      <View style={[styles.card, variant === 'grid' && styles.cardGrid]}>
        
        {/* Kontainer Gambar dengan Badge Border */}
        <View style={[styles.imageContainer, { borderColor: getBadgeColor() }]}>
           <Image source={{ uri: moodUri }} style={styles.mood} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
            {preview}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  cardGrid: {},
  
  // Styling tambahan untuk badge
  imageContainer: {
    width: 68, 
    height: 68,
    borderRadius: 34,
    borderWidth: 3, // Tebal border badge
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  mood: {
    width: 60, height: 60,
    borderRadius: RADIUS.avatar,
    backgroundColor: '#eef2ff',
  },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 6 },
  preview: { fontSize: TYPO.body, color: COLORS.text },
});