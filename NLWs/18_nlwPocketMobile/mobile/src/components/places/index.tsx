import { useRef } from "react"
import { Text, useWindowDimensions } from "react-native"
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { router } from "expo-router"

import { s } from "./styles"
import { Place, PlaceProps } from "../place"

type Props = {
    data: PlaceProps[]
}

export function Places({ data }: Props) {
    // Pega dimensão da tela
    const dimensions = useWindowDimensions()
    const bottomSheetRef = useRef<BottomSheet>(null)

    // Minimo e max da lista (rolagem) pela dimensão da tela
    const snapPoints = {
        min: 278,
        max: dimensions.height - 128,
    }


    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[snapPoints.min, snapPoints.max]}
            handleIndicatorStyle={s.indicator}
            backgroundStyle={s.container}
            enableOverDrag={false}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Place
                      data={item}
                      onPress={() => router.navigate(`/market/${item.id}`)}
                    />
                  )}
                contentContainerStyle={s.content}
                ListHeaderComponent={() => (
                    <Text style={s.title}>Explore locais perto de você</Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </BottomSheet>
    )
}