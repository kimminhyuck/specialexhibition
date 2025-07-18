package com.spring.shoppingmall.repository;

import org.apache.ibatis.annotations.Mapper;
import com.spring.shoppingmall.vo.*;
import java.util.List;

@Mapper
public interface ShoppingmallMapper {
    List<ProductGroupInfoVO> getListExhibition();

    int insertExhibition(ExhibitionDTO exhibitionDTO);

    List<ProductPatternInfoVO> getListDetailExhibition(int exhibitionId);

    List<ProductPatternDetailVO> getListPatternDetail(int prdPtIdx);

    List<ProductInfoVO> getListProduct(int ptDetailIdx);

    List<ProductInfoVO> getListAllProduct(int exhibitionId);
}
