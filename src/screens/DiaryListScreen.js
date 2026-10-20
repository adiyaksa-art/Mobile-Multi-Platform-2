// src/screens/DiaryListScreen.js
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih pagi...',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk. Setelah itu, aku menyempatkan diri membaca beberapa halaman buku sebelum memulai aktivitas. Pagi yang sangat menenangkan dan memberikan energi positif untuk menjalani hari.',
    moodUri: 'https://picsum.photos/seed/happy/200',
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
    moodType: 'happy' // <-- Tambahan untuk warna badge
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul...',
    body: 'Berhasil menyelesaikan modul praktikum lebih awal dari tenggat waktu. Sempat berdiskusi dengan tim mengenai beberapa kendala teknis, dan mendapatkan insight baru dari dosen pembimbing. Hari yang sangat produktif meskipun cukup melelahkan.',
    moodUri: 'https://picsum.photos/seed/focus/200',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
    moodType: 'focus' // <-- Tambahan
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Membaca buku...',
    body: 'Menikmati senja sambil membaca buku favorit di taman kota. Warna langit senja yang indah berpadu dengan udara sore yang sejuk menciptakan suasana reflektif yang sempurna.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
    moodType: 'calm' // <-- Tambahan
  },
  {
    id: 4,
    title: 'Hari yang Melelahkan',
    date: '2025-10-03',
    preview: 'Banyak tugas...',
    body: 'Hari ini rasanya tenaga terkuras habis. Banyak sekali tugas yang harus dikumpulkan beruntun. Ingin cepat istirahat dan tidur pulas malam ini.',
    moodUri: 'https://picsum.photos/seed/tired/200',
    heroUri: 'https://picsum.photos/seed/tiredhero/800/450',
    moodType: 'tired' // <-- Tambahan
  },
  {
    id: 5,
    title: 'Makan Malam Bersama',
    date: '2025-10-02',
    preview: 'Mencoba restoran baru...',
    body: 'Akhirnya sempat berkumpul dengan keluarga untuk makan malam bersama. Kami mencoba restoran makanan laut baru di pinggiran kota. Makanannya enak dan suasananya sangat hangat.',
    moodUri: 'https://picsum.photos/seed/joy/200',
    heroUri: 'https://picsum.photos/seed/joyhero/800/450',
    moodType: 'joy' // <-- Tambahan
  }
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        moodType={item.moodType} // <-- Mengirimkan tipe mood ke komponen kartu
        onPress={() => setSelected(item)}
      />
    </View>
  );

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{
          padding: SPACE.l,
          gap: SPACE.m,
          paddingTop: SPACE.m,
        }}
        ListEmptyComponent={
          // <-- Tantangan Opsional: Empty State yang lebih informatif
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Belum ada momen</Text>
            <Text style={styles.empty}>Yuk, mulai tulis cerita keseharianmu hari ini!</Text>
          </View>
        }
      />
      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 60, 
    padding: SPACE.l 
  },
  emptyTitle: { 
    fontSize: TYPO.title, 
    fontWeight: '700', 
    color: COLORS.text, 
    marginBottom: SPACE.s 
  },
  empty: { 
    textAlign: 'center', 
    color: COLORS.muted 
  },
});