package com.sprinng.shoppingmall.vo;

public class ProdcutPatternInfoVO {
    private int prdPtIdx;
    private int prdGrIdx;
    private String prdPtType;
    private String prdPtSort;
    private String prdPtView;

    public int getPrdPtIdx() {
        return prdPtIdx;
    }

    public void setPrdPtIdx(int prdPtIdx) {
        this.prdPtIdx = prdPtIdx;
    }

    public int getPrdGrIdx() {
        return prdGrIdx;
    }

    public void setPrdGrIdx(int prdGrIdx) {
        this.prdGrIdx = prdGrIdx;
    }

    public String getPrdPtType() {
        return prdPtType;
    }

    public void setPrdPtType(String prdPtType) {
        this.prdPtType = prdPtType;
    }

    public String getPrdPtSort() {
        return prdPtSort;
    }

    public void setPrdPtSort(String prdPtSort) {
        this.prdPtSort = prdPtSort;
    }

    public String getPrdPtView() {
        return prdPtView;
    }

    public void setPrdPtView(String prdPtView) {
        this.prdPtView = prdPtView;
    }

    @Override
    public String toString() {
        return "ProdcutPatternInfoVO{" +
                "prdPtIdx=" + prdPtIdx +
                ", prdGrIdx=" + prdGrIdx +
                ", prdPtType='" + prdPtType + '\'' +
                ", prdPtSort='" + prdPtSort + '\'' +
                ", prdPtView='" + prdPtView + '\'' +
                '}';
    }
}
